import { ExchangeOfficeEntity } from '../../exchange-office/entities/exchange-office.entity';
import { CountryEntity } from '../../country/entities/country.entity';

export class OfficeExchangerDataResultDto {
  exchangeOffices: ExchangeOfficeEntity[];
  countries: CountryEntity[];
}
