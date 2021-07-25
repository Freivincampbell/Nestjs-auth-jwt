import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../schemas/user.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
		private moduleRef: ModuleRef,
	) {
		super({
			passReqToCallback: true,
		});
	}

	async validate(request: Request, username: string, password: string) {
		const contextId = ContextIdFactory.getByRequest(request);
		const authService = await this.moduleRef.resolve(AuthService, contextId);
		const user: User = await authService.validateUser({
			password,
			username,
		});

		if (!user)
			throw new UnauthorizedException({
				data: {
					message: 'Wrong username or password',
					success: false,
				},
			});

		return user;
	}
}
