import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pet_colors')
export class SpecimenEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ type: 'string', name: 'name', unsigned: true })
  name: string

  @Column({ type: 'string', name: 'description', unsigned: true })
  description: string

  constructor(partial?: Partial<SpecimenEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
