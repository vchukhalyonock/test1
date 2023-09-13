import { Injectable, Logger } from '@nestjs/common';
import { CountryService } from '../country/country.service';
import { ExchangeService } from '../exchange/exchange.service';
import { ExchangeOfficeService } from '../exchange-office/exchange-office.service';
import { RateService } from '../rate/rate.service';
import { FormatterService } from '../formatter/formatter.service';
import { FileService } from '../file/file.service';

@Injectable()
export class CliService {
  private readonly logger = new Logger(CliService.name);
  constructor(
    private readonly fileService: FileService,
    private readonly formatterService: FormatterService,
    private readonly countryService: CountryService,
    private readonly exchangeService: ExchangeService,
    private readonly exchangeOfficeService: ExchangeOfficeService,
    private readonly rateService: RateService,
  ) {}

  async importDataFromFile(filename: string) {
    const content = await this.fileService.readContent(filename);
    const exchangeOffices =
      this.formatterService.mapFileContentToExchangeOfficesData(content);
    console.log(JSON.stringify(exchangeOffices));
  }
}
