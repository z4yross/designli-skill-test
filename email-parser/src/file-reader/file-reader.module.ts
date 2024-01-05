import { Module } from '@nestjs/common';
import { FileReaderService } from './file-reader.service';
import { ParserModule } from 'src/parser/parser.module';
import { DownloaderModule } from 'src/downloader/downloader.module';

@Module({
    providers: [FileReaderService],
    imports: [ParserModule, DownloaderModule],
    exports: [FileReaderService],
})
export class FileReaderModule {}
