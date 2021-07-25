import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UsersService } from '../users/users.service';
import { ICurrentUser } from '../interfaces/ICurrentUser';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser({
		username,
		password,
	}: {
		username: string;
		password: string;
	}): Promise<User> {
		const user: User = await this.usersService.findOneByUserName({
			username,
		});

		if (user?.comparePassword(password)) return user;

		return null;
	}

	async login({
		id,
		username,
		role,
	}: {
		id: ObjectId;
		username: string;
		role: string;
	}): Promise<{ access_token: string }> {
		const payload: ICurrentUser = {
			id,
			username,
			role,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
