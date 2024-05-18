import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PetEntity } from '@/core/entities/pets/pet.entity'

@Entity('specimen')
export class SpecimenEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ type: 'string', name: 'name', unsigned: true })
  name: string

  @Column({ type: 'string', name: 'description', unsigned: true })
  description: string

  @ManyToOne(() => PetEntity, (pet) => pet.colors)
  pets: PetEntity[]

  constructor(partial?: Partial<SpecimenEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
