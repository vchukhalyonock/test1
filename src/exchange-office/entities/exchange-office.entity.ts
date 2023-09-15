import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RateEntity } from '../../rate/entities/rate.entity';
import { ExchangeEntity } from '../../exchange/entities/exchange.entity';

@Entity('exchange_offices')
export class ExchangeOfficeEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  country: string;

  @OneToMany(() => RateEntity, (rate) => rate.exchangeOffice)
  rates: RateEntity[];

  @OneToMany(() => ExchangeEntity, (exchange) => exchange.exchangeOffice)
  exchanges: ExchangeEntity[];
}
