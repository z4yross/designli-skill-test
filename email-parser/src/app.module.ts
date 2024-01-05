import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { ParserModule } from './parser/parser.module';

@Module({
    imports: [ConfigModule.forRoot(), ParserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
