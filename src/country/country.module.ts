import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryRepository } from './country.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryService, CountryRepository],
  exports: [CountryService],
})
export class CountryModule {}
