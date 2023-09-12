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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
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
    ExchangeOfficeModule,
    RateModule,
    CountryModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
