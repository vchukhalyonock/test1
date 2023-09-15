import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { CliCommand } from './cli.command';
import { CountryModule } from '../country/country.module';
import { ExchangeModule } from '../exchange/exchange.module';
import { ExchangeOfficeModule } from '../exchange-office/exchange-office.module';
import { RateModule } from '../rate/rate.module';
import { ParserModule } from '../parser/parser.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    FileModule,
    ParserModule,
    CountryModule,
    ExchangeModule,
    ExchangeOfficeModule,
    RateModule,
  ],
  providers: [CliService, CliCommand],
  exports: [CliService, CliCommand],
})
export class CliModule {}
