import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Migrate1715734200513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumns('users', [
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: true,
      }),
      new TableColumn({
        name: 'password',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'isActive',
        type: 'boolean',
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: true,
      }),
      new TableColumn({
        name: 'password',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'isActive',
        type: 'boolean',
      }),
    ])
  }
}
