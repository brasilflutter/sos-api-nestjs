import { PetColorsTypeEnum } from '@/core/enums/pet-colors-type.enum'
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ColorEntity } from '@/core/entities/pets/color.entity'
import { PetEntity } from '@/core/entities/pets/pet.entity'

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

  @ManyToOne(() => PetEntity, (pet) => pet.colors)
  pets: PetEntity[]

  @OneToOne(() => ColorEntity, (color) => color.petColors)
  color: ColorEntity

  constructor(partial?: Partial<PetColorsEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
