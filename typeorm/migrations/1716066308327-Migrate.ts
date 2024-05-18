import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Migrate1716066308327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('colors', [
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    ])
    await queryRunner.addColumns('breeds', [
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    ])
    await queryRunner.addColumns('specimens', [
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('colors', 'name')
    await queryRunner.dropColumn('breeds', 'name')
    await queryRunner.dropColumn('specimens', 'name')
  }
}
