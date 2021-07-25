import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUser } from '../../interfaces/ICurrentUser';

export const CurrentUser = createParamDecorator(
	(data: string, ctx: ExecutionContext): ICurrentUser => {
		const { user } = ctx.switchToHttp().getRequest();

		return data ? user?.[data] : user;
	},
);
