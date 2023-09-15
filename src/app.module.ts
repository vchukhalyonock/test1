import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeOfficeModule } from './exchange-office/exchange-office.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country/entities/country.entity';
import { ExchangeOfficeEntity } from './exchange-office/entities/exchange-office.entity';
import { RateModule } from './rate/rate.module';
import { CountryModule } from './country/country.module';
import { RateEntity } from './rate/entities/rate.entity';
import { ExchangeModule } from './exchange/exchange.module';
import { ExchangeEntity } from './exchange/entities/exchange.entity';
import { CommandModule } from 'nestjs-command';
import { CliCommand } from './cli/cli.command';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { CliModule } from './cli/cli.module';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host:
          process.env.NODE_ENV === 'local'
            ? '127.0.0.1'
            : process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        ssl:
          process.env.POSTGRES_USE_SSL === 'true'
            ? { rejectUnauthorized: false }
            : false,
        entities: [
          CountryEntity,
          ExchangeOfficeEntity,
          RateEntity,
          ExchangeEntity,
        ],
        synchronize: process.env.POSTGRES_SYNCRONIZE === 'true',
        logging: process.env.POSTGRES_LOGGING === 'true',
      }),
    }),
    CommandModule,
    ExchangeOfficeModule,
    RateModule,
    CountryModule,
    ExchangeModule,
    FileModule,
    CliModule,
    ParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
