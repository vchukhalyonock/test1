import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RateEntity } from './entities/rate.entity';

@Injectable()
export class RateRepository extends Repository<RateEntity> {
  constructor(private dataSource: DataSource) {
    super(RateEntity, dataSource.createEntityManager());
  }
}
