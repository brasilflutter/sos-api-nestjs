import { PetColorsTypeEnum } from '@/core/enums/pet-colors-type.enum'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ColorEntity } from '@/core/entities/pets/color.entity'

@Entity('pet_colors')
export class PetColorsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'idPet', unsigned: true })
  idPet: number

  @Column('int', { name: 'idColor', unsigned: true })
  idColor: number

  @Column('enum', { name: 'type', enum: PetColorsTypeEnum })
  type: PetColorsTypeEnum

  // get name from the ColorEntity
  @OneToOne(() => ColorEntity, (color) => color.name)
  name: string

  @OneToOne(() => ColorEntity, (color) => color.description)
  description: string

  constructor(partial?: Partial<PetColorsEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
