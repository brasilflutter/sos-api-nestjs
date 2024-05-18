import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrate1716072032222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const json = [
      {
        name: 'Micro',
        id: 1,
      },
      {
        name: 'Toy',
        id: 2,
      },
      {
        name: 'Anão',
        id: 3,
      },
      {
        name: 'Pequeno',
        id: 4,
      },
      {
        name: 'Médio',
        id: 5,
      },
      {
        name: 'Grande',
        id: 6,
      },
      {
        name: 'Gigante',
        id: 7,
      },
    ]
      .map((size) => `(${size.id}, '${size.name}')`)
      .join(', ')

    await queryRunner.query(
      `INSERT INTO sizes (id, name)
       VALUES ${json}`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('sizes')
  }
}
