import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ExchangeEntity } from './entities/exchange.entity';

@Injectable()
export class ExchangeRepository extends Repository<ExchangeEntity> {
  constructor(private dataSource: DataSource) {
    super(ExchangeEntity, dataSource.createEntityManager());
  }
}
