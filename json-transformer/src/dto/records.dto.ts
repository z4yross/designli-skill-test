import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

class Verdict {
    @IsString()
    status: string;
}

class Action {
    @IsString()
    type: string;

    @IsString()
    topicArn: string;
}

class Receipt {
    @IsString()
    timestamp: string;

    @IsNumber()
    processingTimeMillis: number;

    @IsArray()
    recipients: string[];

    @ValidateNested()
    spamVerdict: Verdict;

    @ValidateNested()
    virusVerdict: Verdict;

    @ValidateNested()
    spfVerdict: Verdict;

    @ValidateNested()
    dkimVerdict: Verdict;

    @ValidateNested()
    dmarcVerdict: Verdict;

    @IsString()
    dmarcPolicy: string;

    @ValidateNested()
    action: Action;
}

class Headers {
    @IsString()
    name: string;

    @IsString()
    value: string;
}

class CommonHeaders {
    @IsEmail()
    returnPath: string;

    @IsArray()
    @IsEmail({}, { each: true })
    from: string[];

    @IsString()
    date: string;

    @IsArray()
    @IsEmail({}, { each: true })
    to: string[];

    @IsString()
    messageId: string;

    @IsString()
    subject: string;
}

class Mail {
    @IsString()
    timestamp: string;

    @IsString()
    source: string;

    @IsString()
    messageId: string;

    @IsArray()
    @IsEmail({}, { each: true })
    destination: string[];

    @IsBoolean()
    headersTruncated: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    headers: Headers[];

    @ValidateNested()
    commonHeaders: CommonHeaders;
}

class Ses {
    @ValidateNested()
    receipt: Receipt;

    @ValidateNested()
    mail: Mail;
}

class Record {
    @IsString()
    eventVersion: string;

    @ValidateNested()
    ses: Ses;

    @IsString()
    eventSource: string;
}

export class RecordsDto {
    @IsArray()
    @ValidateNested({ each: true })
    Records: Record[];
}
