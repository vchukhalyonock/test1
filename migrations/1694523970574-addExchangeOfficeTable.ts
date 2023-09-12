import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'exchange_offices';

export class AddExchangeOfficeTable1694523970574 implements MigrationInterface {
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
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '2',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['country'],
            referencedColumnNames: ['code'],
            referencedTableName: 'countries',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const t = await queryRunner.getTable(tableName);
    const fk = t.foreignKeys.find((fk) => fk.columnNames.includes('country'));
    await queryRunner.dropForeignKey(tableName, fk);
    await queryRunner.dropTable(tableName);
  }
}
