import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';

@Injectable()
export class CountryRepository extends Repository<CountryEntity> {
  constructor(private dataSource: DataSource) {
    super(CountryEntity, dataSource.createEntityManager());
  }
}
