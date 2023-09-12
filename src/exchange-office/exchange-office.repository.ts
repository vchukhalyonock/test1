import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ExchangeOfficeEntity } from './entities/exchange-office.entity';

@Injectable()
export class ExchangeOfficeRepository extends Repository<ExchangeOfficeEntity> {
  constructor(private dataSource: DataSource) {
    super(ExchangeOfficeEntity, dataSource.createEntityManager());
  }
}
