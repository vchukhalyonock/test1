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
    this.logger.log('Start importing process');
    const content = await this.fileService.readContent(filename);
    const { countries, exchangeOffices } =
      this.parserService.mapContent(content);

    this.logger.log('Importing countries');
    await this.countryService.updateCountries(countries);

    this.logger.log('Importing offices');
    await this.exchangeOfficeService.updateOffices(exchangeOffices);

    this.logger.log('Start importing rates and exchanges');
    for (const office of exchangeOffices) {
      this.logger.log(`Processing office ${office.name}:`);
      const { id } = office;
      const rates = office.rates.map((r) => ({ ...r, officeId: id }));
      const exchanges = office.exchanges.map((e) => ({ ...e, officeId: id }));

      this.logger.log('-- Insert rates');
      await this.rateService.insertRates(rates);

      this.logger.log('-- Calculate bids and insert exchanges');
      await this.exchangeService.insertExchanges(exchanges);
    }
  }
}
