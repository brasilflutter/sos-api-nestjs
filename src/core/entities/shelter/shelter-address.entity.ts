import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shelter_addresses')
export class ShelterAddressEntity {
  constructor(partial?: Partial<ShelterAddressEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ name: 'idShelter', unsigned: true })
  idShelter: number

  @Column({ name: 'idAddress', unsigned: true })
  idAddress: number
}
