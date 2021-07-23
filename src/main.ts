import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule);
	const config: ConfigService = app.get(ConfigService);
	const PORT: number = config.get('PORT');

	await app.listen(PORT, () => {
		console.log(`App running on port: ${PORT} 🚀`);
	});
}

bootstrap().then();
