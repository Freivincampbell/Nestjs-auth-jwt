import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as uniqueValidatorOnUpdate from 'mongoose-beautiful-unique-validation';
import * as uniqueValidatorOnCreate from 'mongoose-unique-validator';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: User.name,
				useFactory: () => {
					UserSchema.plugin(uniqueValidatorOnCreate, {
						message: '{PATH} already exists',
					});
					UserSchema.plugin(uniqueValidatorOnUpdate, {
						message: '{PATH} already exists',
					});

					return UserSchema;
				},
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
