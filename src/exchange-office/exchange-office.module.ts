import { Module } from '@nestjs/common';
import { ExchangeOfficeService } from './exchange-office.service';
import { ExchangeOfficeRepository } from './exchange-office.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeOfficeEntity } from './entities/exchange-office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeOfficeEntity])],
  providers: [ExchangeOfficeService, ExchangeOfficeRepository],
  exports: [ExchangeOfficeService],
})
export class ExchangeOfficeModule {}
