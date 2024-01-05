import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);

    const envPort = configService.get('PORT');
    const port = envPort ? envPort : 3000;

    await app.listen(port);
}
bootstrap();
