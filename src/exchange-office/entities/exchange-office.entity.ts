import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RateEntity } from '../../rate/entities/rate.entity';
import { ExchangeEntity } from '../../exchange/entities/exchange.entity';

@Entity('exchange-office')
export class ExchangeOfficeEntity {
  @PrimaryGeneratedColumn()
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
