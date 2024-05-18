import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PetEntity } from '@/core/entities/pets/pet.entity'

@Entity('sizes')
export class SizeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ name: 'name', unsigned: true })
  name: string

  @Column({ name: 'description', unsigned: true })
  description: string

  @ManyToOne(() => PetEntity, (pet) => pet.colors)
  pets: PetEntity[]

  constructor(partial?: Partial<SizeEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
