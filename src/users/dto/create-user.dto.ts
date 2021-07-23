import {
	IsEmail,
	IsEnum,
	IsMobilePhone,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { ROLE, STATUS } from '../../constants';

export class CreateUserDto {
	@IsNotEmpty({ message: 'Name must not be empty' })
	@IsString({ message: 'Name must be a string' })
	@MinLength(4, { message: 'Name must not be less than 4 charters' })
	@MaxLength(16, {
		message: 'Name is longer than the maximum allowed length (16)',
	})
	readonly name: string;

	@IsNotEmpty({ message: 'Last Name must not be empty' })
	@IsString({ message: 'Last Name must be a string' })
	@MinLength(4, { message: 'Last name must not be less than 4 charters' })
	@MaxLength(16, {
		message: 'Last name is longer than the maximum allowed length (16)',
	})
	readonly lastName: string;

	@IsNotEmpty({ message: 'Email must not be empty' })
	@IsString({ message: 'Email must be a string' })
	@IsEmail()
	readonly email: string;

	@IsNotEmpty({ message: 'Username must not be empty' })
	@IsString({ message: 'Username must be a string' })
	@MinLength(4, { message: 'Username must not be less than 4 charters' })
	@MaxLength(32, {
		message: 'Username is longer than the maximum allowed length (32)',
	})
	readonly username: string;

	@IsNotEmpty({ message: 'Password must not be empty' })
	@IsString({ message: 'Password must be a string' })
	@MinLength(5, { message: 'Password must not be less than 5 charters' })
	@MaxLength(32, {
		message: 'Password is longer than the maximum allowed length (32)',
	})
	password: string;

	@IsNotEmpty({ message: 'Status must not be empty' })
	@IsString({ message: 'Status must be a string' })
	@IsEnum([STATUS.ACTIVE, STATUS.PENDING, STATUS.SUSPENDED, STATUS.SUSPENDED])
	readonly status: string;

	@IsNotEmpty({ message: 'Role must not be empty' })
	@IsString({ message: 'Role must be a string' })
	@IsEnum([ROLE.ADMIN, ROLE.USER])
	readonly role: string;
}
