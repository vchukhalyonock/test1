import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { CliCommand } from './cli.command';
import { CountryModule } from '../country/country.module';
import { ExchangeModule } from '../exchange/exchange.module';
import { ExchangeOfficeModule } from '../exchange-office/exchange-office.module';
import { RateModule } from '../rate/rate.module';
import { FormatterModule } from '../formatter/formatter.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    FileModule,
    FormatterModule,
    CountryModule,
    ExchangeModule,
    ExchangeOfficeModule,
    RateModule,
  ],
  providers: [CliService, CliCommand],
  exports: [CliService, CliCommand],
})
export class CliModule {}
