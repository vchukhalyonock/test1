import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExchangeOfficeEntity } from '../../exchange-office/entities/exchange-office.entity';

@Entity('rates')
export class RateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'office_id', type: 'int', nullable: false })
  officeId: number;

  @Column({ type: 'varchar', length: 3, nullable: false })
  from: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  to: string;

  @Column({ type: 'float', nullable: false })
  in: number;

  @Column({ type: 'float', nullable: false })
  out: number;

  @Column({ type: 'int', nullable: false })
  reserve: number;

  @Column({
    type: 'time without time zone',
    nullable: false,
    default: Date.now(),
  })
  date: number;

  @ManyToOne(
    () => ExchangeOfficeEntity,
    (exchangeOffice) => exchangeOffice.rates,
  )
  @JoinColumn({ name: 'office_id', referencedColumnName: 'id' })
  exchangeOffice: ExchangeOfficeEntity;
}
