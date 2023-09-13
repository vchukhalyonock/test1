import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'exchanges';

export class AddExchangesTable1694529769613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'office_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'from',
            type: 'varchar',
            length: '3',
            isNullable: false,
          },
          {
            name: 'to',
            type: 'varchar',
            length: '3',
            isNullable: false,
          },
          {
            name: 'ask',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'bid',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp without time zone',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['office_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'exchange_offices',
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const t = await queryRunner.getTable(tableName);
    const fk = t.foreignKeys.find((f) => f.columnNames.includes('office_id'));
    await queryRunner.dropForeignKey(tableName, fk);
    await queryRunner.dropTable(tableName);
  }
}
