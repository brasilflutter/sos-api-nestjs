import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Migrate1715734200513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: true,
        isNullable: false,
      }),
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: false,
      }),
      new TableColumn({
        name: 'isActive',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'email')
    await queryRunner.dropColumn('users', 'password')
    await queryRunner.dropColumn('users', 'isActive')
  }
}
