import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		ConfigService,
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: async (config: ConfigService) => ({
				secret: config.get('JWT_SECRET_KEY'),
				signOptions: { expiresIn: config.get('EXPIRES_IN') },
			}),
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
