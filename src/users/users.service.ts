import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { STATUS } from '../constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly configService: ConfigService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = new this.userModel(createUserDto);

		createdUser.password = await this.hashPassword({
			password: createdUser.password,
		});

		const result = await createdUser.save().catch((errors) => {
			return errors;
		});

		if (result.id) return await this.findOne(result.id);

		return result;
	}

	async findOne(id): Promise<User> {
		return await this.userModel
			.findOne(id)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async findOneByUserName({ username }: { username: string }): Promise<User> {
		return await this.userModel
			.findOne({ username, status: STATUS.ACTIVE })
			.select('+password')
			.exec()
			.catch((error) => {
				return error;
			});
	}

	private readonly hashPassword = async ({
		password,
	}: {
		password: string;
	}): Promise<string> => {
		return await new this.userModel().hashPassword(
			password,
			parseInt(this.configService.get('HASH_SALT')),
		);
	};
}
