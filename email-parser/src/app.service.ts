import { Injectable } from '@nestjs/common';
import { ParserService } from './parser/parser.service';
import { FileReaderService } from './file-reader/file-reader.service';

@Injectable()
export class AppService {
    constructor(
        private readonly parserService: ParserService,
        private readonly fileReaderService: FileReaderService,
    ) {}

    getHello(): string {
        return 'Hello World!';
    }

    async getJsonFromEmail(mailPathOrUrl: string): Promise<string[]> {
        const mail = await this.parserService.parseEmail(mailPathOrUrl);
        const jsons = await this.fileReaderService.getJsonFromEmail(mail);
        return jsons;
    }
}
