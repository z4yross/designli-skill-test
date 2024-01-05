import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper/mapper.service';
import { RecordsDto } from './dto/records.dto';
import { MappedRecord } from './dto/mapped.dto';

@Injectable()
export class AppService {
    constructor(private readonly mapperService: MapperService) {}

    mapRecords(records: RecordsDto): MappedRecord {
        return this.mapperService.mapRecords(records);
    }
}
