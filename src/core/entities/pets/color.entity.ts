import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PetColorsEntity } from '@/core/entities/pets/pet-colors-entity'

@Entity('colors')
export class ColorEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ type: 'string', name: 'name', unsigned: true })
  name: string

  @Column({ type: 'string', name: 'description', unsigned: true })
  description: string

  @OneToMany(() => PetColorsEntity, (entity) => entity.color)
  petColors: PetColorsEntity[]

  constructor(partial?: Partial<ColorEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
