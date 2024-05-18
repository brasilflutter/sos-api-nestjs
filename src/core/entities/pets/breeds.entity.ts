import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pet_colors')
export class BreedsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ name: 'name', unsigned: true })
  name: string

  @Column({ name: 'description', unsigned: true })
  description: string

  constructor(partial?: Partial<BreedsEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
