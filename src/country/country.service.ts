import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { CountryEntity } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async updateCountries(countries: CountryEntity[]): Promise<void> {
    await this.countryRepository.upsert(countries, ['code']);
  }
}
