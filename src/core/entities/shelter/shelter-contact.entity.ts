import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shelter_contacts')
export class ShelterContactEntity {
  constructor(partial?: Partial<ShelterContactEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ name: 'idShelter', unsigned: true })
  idShelter: number

  @Column({ name: 'type', unsigned: true })
  type: number

  @Column({ name: 'value', default: '' })
  value: string
}
