import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ICurrentUser } from '../interfaces/ICurrentUser';
import { Public } from '../lib/decorators/public.decorator';
import { CurrentUser } from '../lib/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req): Promise<any> {
		return this.authService.login(req.user);
	}

	@Get('current-user')
	getProfile(@CurrentUser() user: ICurrentUser): ICurrentUser {
		return user;
	}
}
