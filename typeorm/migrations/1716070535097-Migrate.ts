import { MigrationInterface, QueryRunner } from 'typeorm'
import * as path from 'path'
import * as fs from 'fs'

export class Migrate1716070535097 implements MigrationInterface {
  getFileData(fileName: string) {
    const filePath = path.join(
      __dirname,
      '..',
      'data/1716070535097-Migrate',
      fileName,
    )
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const specimens = this.getFileData('species.json')
    const colors = this.getFileData('colors.json')
    const breeds = this.getFileData('breeds.json')

    const parsedBreeds = breeds
      .map(
        (breed) =>
          `(${breed['id']}, '${breed['description']}', ${breed['id_species']})`,
      )
      .join(',')

    const parsedColors = colors
      .map((color) => `(${color['id']}, '${color['description']}')`)
      .join(',')

    const parsedSpecimens = specimens
      .map((specimen) => {
        return `(${specimen['id']}, '${specimen['description']}')`
      })
      .join(',')

    console.log(parsedSpecimens)

    await queryRunner.query(`INSERT INTO colors (id, name)
                             VALUES ${parsedColors}`)
    await queryRunner.query(`INSERT INTO specimens (id, name)
                             VALUES ${parsedSpecimens}`)
    await queryRunner.query(`INSERT INTO breeds (id, name, "specimenId")
                             VALUES ${parsedBreeds}`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('breeds')
    await queryRunner.clearTable('colors')
    await queryRunner.clearTable('specimens')
  }
}
