import { Injectable } from '@nestjs/common';
import { ExchangeRepository } from './exchange.repository';

@Injectable()
export class ExchangeService {
  constructor(private readonly exchangeRepository: ExchangeRepository) {}
}
