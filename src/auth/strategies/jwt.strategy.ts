import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ICurrentUser } from '../../interfaces/ICurrentUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.get('JWT_SECRET_KEY'),
		});
	}

	async validate({ id, username, role }): Promise<ICurrentUser> {
		return {
			id,
			username,
			role,
		};
	}
}
