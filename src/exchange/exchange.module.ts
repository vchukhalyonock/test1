import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeRepository } from './exchange.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeEntity } from './entities/exchange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeEntity])],
  providers: [ExchangeService, ExchangeRepository],
  exports: [ExchangeService],
})
export class ExchangeModule {}
