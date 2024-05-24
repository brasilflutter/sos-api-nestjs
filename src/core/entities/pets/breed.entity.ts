import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PetEntity } from '@/core/entities/pets/pet.entity'
import { SpecimenEntity } from '@/core/entities/pets/specimen.entity'

@Entity('breeds')
export class BreedEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ name: 'name', unsigned: true })
  name: string

  @Column({ name: 'description', unsigned: true, nullable: true })
  description?: string

  @ManyToOne(() => PetEntity, (pet) => pet.breed)
  pets: PetEntity[]

  @ManyToOne(() => SpecimenEntity, (specimen) => specimen.breeds)
  specimen: SpecimenEntity

  constructor(partial?: Partial<BreedEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
