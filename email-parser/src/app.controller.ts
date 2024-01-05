import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { FileReaderService } from './file-reader/file-reader.service';
import { ParserService } from './parser/parser.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly parserService: ParserService,
        // private readonly fileReaderService: FileReaderService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('parse')
    async parseEmail(@Body() body: { filePath: string }): Promise<any> {
        const parsedEmail = await this.parserService.parseEmail(body.filePath);
        return parsedEmail;
    }
}
