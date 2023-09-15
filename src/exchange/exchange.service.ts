import { Injectable } from '@nestjs/common';
import { ExchangeRepository } from './exchange.repository';
import { ExchangeEntity } from './entities/exchange.entity';
import { RateService } from '../rate/rate.service';

@Injectable()
export class ExchangeService {
  constructor(
    private readonly exchangeRepository: ExchangeRepository,
    private readonly rateService: RateService,
  ) {}

  async insertExchanges(exchanges: ExchangeEntity[]): Promise<void> {
    await Promise.all(exchanges.map(async (e) => this.bidCalculator(e)));
    await this.exchangeRepository.save(exchanges);
  }

  private async bidCalculator(exchange: ExchangeEntity): Promise<void> {
    const rate = await this.rateService.getRateForExchange(exchange);
    if (!rate) {
      exchange.bid = 0;
      return;
    }
    const bid = (exchange.ask * rate.out) / rate.in;
    exchange.bid = bid <= rate.reserve ? Math.trunc(bid) : 0;
  }
}
