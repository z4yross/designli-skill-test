import { Injectable } from '@nestjs/common';

import * as MailParser from 'mailparser';

@Injectable()
export class ParserService {
    private options: MailParser.MailParserOptions;

    constructor() {
        this.options = {
            skipImageLinks: true,
            skipHtmlToText: true,
        };
    }

    async parseEmail(email: string): Promise<MailParser.ParsedMail> {
        const parser = await MailParser.simpleParser(email, this.options);
        return parser;
    }
}
