import { Injectable, Logger } from '@nestjs/common';
import { CountryService } from '../country/country.service';
import { ExchangeService } from '../exchange/exchange.service';
import { ExchangeOfficeService } from '../exchange-office/exchange-office.service';
import { RateService } from '../rate/rate.service';
import { ParserService } from '../parser/parser.service';
import { FileService } from '../file/file.service';

@Injectable()
export class CliService {
  private readonly logger = new Logger(CliService.name);
  constructor(
    private readonly fileService: FileService,
    private readonly parserService: ParserService,
    private readonly countryService: CountryService,
    private readonly exchangeService: ExchangeService,
    private readonly exchangeOfficeService: ExchangeOfficeService,
    private readonly rateService: RateService,
  ) {}

  async importDataFromFile(filename: string) {
    const content = await this.fileService.readContent(filename);
    const { countries, exchangeOffices } =
      this.parserService.mapContent(content);

    await this.countryService.updateCountries(countries);

    await this.exchangeOfficeService.updateOffices(exchangeOffices);

    for (const office of exchangeOffices) {
      const { id } = office;
      const rates = office.rates.map((r) => ({ ...r, officeId: id }));
      const exchanges = office.exchanges.map((e) => ({ ...e, officeId: id }));

      await this.rateService.insertRates(rates);

      await this.exchangeService.insertExchanges(exchanges);
    }
  }
}
