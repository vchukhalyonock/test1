import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('countries')
export class CountryEntity {
  @PrimaryColumn({ type: 'varchar', length: 3, nullable: false })
  code: string;

  @Column({ type: 'varchar', length: '128', nullable: false })
  name: string;
}
