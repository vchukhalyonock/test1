import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeRepository } from './exchange.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeEntity } from './entities/exchange.entity';
import { RateModule } from '../rate/rate.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeEntity]), RateModule],
  providers: [ExchangeService, ExchangeRepository],
  exports: [ExchangeService],
})
export class ExchangeModule {}
