import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExchangeOfficeEntity } from '../../exchange-office/entities/exchange-office.entity';

@Entity('exchanges')
export class ExchangeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 3, nullable: false })
  from: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  to: string;

  @Column({ type: 'float', nullable: false })
  ask: number;

  @Column({ type: 'float', nullable: false })
  bid: number;

  @Column({
    type: 'time without time zone',
    nullable: false,
    default: Date.now(),
  })
  date: number;

  @ManyToOne(
    () => ExchangeOfficeEntity,
    (exchangeOffice) => exchangeOffice.exchanges,
  )
  @JoinColumn({ name: 'office_id', referencedColumnName: 'id' })
  exchangeOffice: ExchangeOfficeEntity;
}
