import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { ParserModule } from './parser/parser.module';
import { FileReaderModule } from './file-reader/file-reader.module';
import { DownloaderModule } from './downloader/downloader.module';

@Module({
    imports: [ConfigModule.forRoot(), ParserModule, FileReaderModule, DownloaderModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
