import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PetColorsEntity } from '@/core/entities/pets/pet-colors-entity'

@Entity('colors')
export class ColorEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ type: 'varchar', name: 'name' })
  name: string

  @Column({ type: 'varchar', name: 'description' })
  description: string

  @OneToMany(() => PetColorsEntity, (entity) => entity.color)
  petColors: PetColorsEntity[]

  constructor(partial?: Partial<ColorEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
