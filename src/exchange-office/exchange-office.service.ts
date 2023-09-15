import { Injectable } from '@nestjs/common';
import { ExchangeOfficeRepository } from './exchange-office.repository';
import { ExchangeOfficeEntity } from './entities/exchange-office.entity';

@Injectable()
export class ExchangeOfficeService {
  constructor(
    private readonly exchangeOfficeRepository: ExchangeOfficeRepository,
  ) {}

  async updateOffices(office: ExchangeOfficeEntity[]): Promise<void> {
    await this.exchangeOfficeRepository.upsert(office, ['id']);
  }
}
