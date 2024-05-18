import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class Migrate1716067528946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'breeds',
      new TableColumn({
        name: 'specimenId',
        type: 'integer',
        isNullable: false,
      }),
    )

    await queryRunner.createForeignKey(
      'breeds',
      new TableForeignKey({
        columnNames: ['specimenId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'specimens',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('breeds')
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('specimenId') !== -1,
    )
    await queryRunner.dropForeignKey('breeds', foreignKey)
    await queryRunner.dropColumn('breeds', 'specimenId')
  }
}
