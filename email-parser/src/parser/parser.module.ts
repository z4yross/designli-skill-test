import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { DownloaderModule } from 'src/downloader/downloader.module';

@Module({
    providers: [ParserService],
    exports: [ParserService],
    imports: [DownloaderModule]
})
export class ParserModule {}
