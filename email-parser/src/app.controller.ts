import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { FileReaderService } from './file-reader/file-reader.service';
import { ParserService } from './parser/parser.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('parse')
    async parseEmail(@Body() body: { filePath: string }): Promise<any> {
        const parsedEmail = await this.appService.getJsonFromEmail(
            body.filePath,
        );

        if (parsedEmail) return parsedEmail;

        throw new HttpException("Couldn't find any JSON in the email attachments or ebmedded in the email body.", HttpStatus.NO_CONTENT);
    }
}
