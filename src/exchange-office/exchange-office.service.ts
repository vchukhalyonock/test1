import { Injectable } from '@nestjs/common';
import { ExchangeOfficeRepository } from './exchange-office.repository';

@Injectable()
export class ExchangeOfficeService {
  constructor(
    private readonly exchangeOfficeRepository: ExchangeOfficeRepository,
  ) {}
}
