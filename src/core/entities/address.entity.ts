import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('address')
export class AddressEntity {
  constructor(partial?: Partial<AddressEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'number', length: 255 })
  number: string

  @Column('varchar', { name: 'street', length: 255 })
  street: string

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description?: string | null

  @Column('varchar', { name: 'neighborhood', length: 255 })
  neighborhood: string

  @Column('varchar', { name: 'city', length: 255 })
  city: string

  @Column('varchar', { name: 'state', length: 100 })
  state: string

  @Column('varchar', { name: 'country', length: 100 })
  country: string

  @Column('varchar', { name: 'zip', length: 100 })
  zip: string

  @Column('varchar', { name: 'latitude', nullable: true, length: 20 })
  latitude?: string | null

  @Column('varchar', { name: 'longitude', nullable: true, length: 20 })
  longitude?: string | null

  @Column('tinyint', { name: 'index', default: () => true })
  index: boolean

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt?: Date | null
}
