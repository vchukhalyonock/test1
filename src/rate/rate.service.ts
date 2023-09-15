import { Injectable } from '@nestjs/common';
import { RateEntity } from './entities/rate.entity';
import { RateRepository } from './rate.repository';
import { ExchangeEntity } from '../exchange/entities/exchange.entity';
import { LessThan } from 'typeorm';

@Injectable()
export class RateService {
  constructor(private readonly rateRepository: RateRepository) {}
  async insertRates(rates: RateEntity[]): Promise<void> {
    await this.rateRepository.save(rates);
  }

  async getRateForExchange(exchange: ExchangeEntity): Promise<RateEntity> {
    const { from, to, date } = exchange;
    return this.rateRepository.findOne({
      where: {
        from,
        to,
        date: LessThan(date),
      },
      order: {
        date: 'DESC',
      },
    });
  }
}
