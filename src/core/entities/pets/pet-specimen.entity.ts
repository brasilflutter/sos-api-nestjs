import { PetEntity } from '@/core/entities/pets/pet.entity'
import { PetColorsTypeEnum } from '@/core/enums/pet-colors-type.enum'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pet_colors')
export class PetSpecimenEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'idPet', unsigned: true })
  idPet: number

  @Column('int', { name: 'idColor', unsigned: true })
  idColor: number

  @Column('enum', { name: 'type', enum: PetColorsTypeEnum })
  type: PetColorsTypeEnum

  @ManyToOne(() => PetEntity, (pet) => pet.colors)
  pet: PetEntity

  constructor(partial?: Partial<PetSpecimenEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
