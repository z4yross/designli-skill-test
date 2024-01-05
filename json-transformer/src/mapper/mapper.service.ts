import { Injectable } from '@nestjs/common';
import { RecordsDto } from '../dto/records.dto';
import { MappedRecord } from '../dto/mapped.dto';

import * as dayjs from 'dayjs';

@Injectable()
export class MapperService {
    mapRecords(records: RecordsDto): MappedRecord {
        const spam =
            records.Records[0].ses.receipt.spamVerdict.status === 'PASS';

        const virus =
            records.Records[0].ses.receipt.virusVerdict.status === 'PASS';

        const spf = records.Records[0].ses.receipt.spfVerdict.status === 'PASS';
        const dkim =
            records.Records[0].ses.receipt.dkimVerdict.status === 'PASS';
        const dmarc =
            records.Records[0].ses.receipt.dmarcVerdict.status === 'PASS';
        const dns = spf && dkim && dmarc;

        const mes = dayjs(records.Records[0].ses.mail.timestamp).format('MMMM');

        const processingTimeMillis =
            records.Records[0].ses.receipt.processingTimeMillis;
        const retrasado = processingTimeMillis > 1000;

        const emisor = records.Records[0].ses.mail.source.split('@')[0];

        const receptor = records.Records[0].ses.mail.destination.map(
            (destino) => {
                return destino.split('@')[0];
            },
        );

        const mappedRecord: MappedRecord = {
            spam,
            virus,
            dns,
            mes,
            retrasado,
            emisor,
            receptor,
        };

        return mappedRecord;
    }
}
