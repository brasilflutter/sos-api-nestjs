import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Migrate1716071763290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sizes',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sizes', 'name')
  }
}
