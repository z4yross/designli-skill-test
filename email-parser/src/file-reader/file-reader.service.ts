import { Injectable } from '@nestjs/common';

import * as MailParser from 'mailparser';
import { ParserService } from 'src/parser/parser.service';

@Injectable()
export class FileReaderService {
    constructor(private readonly parserService: ParserService) {}

    checkIfJsonInAttachments(mail: MailParser.ParsedMail) {
        const JSONAttachments =
            this.parserService.parseBufferedAttachments(mail);
        return JSONAttachments;
    }

    checkIfJsonInWebSite(mail: MailParser.ParsedMail) {}

    checkIfJsonInBody(mail: MailParser.ParsedMail) {}

    getJsonFromEmail(mail: MailParser.ParsedMail) {
        let jsons = [];

        const JSONAttachments = this.checkIfJsonInAttachments(mail);

        const JSONBody = this.checkIfJsonInBody(mail);

        jsons.push(...JSONAttachments);
        jsons.push(JSONBody);

        return jsons;
    }
}
