import { ClientEntity } from '@/core/entities/client.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('address')
export class AddressEntity {
  constructor(partial?: Partial<AddressEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'zipCode', length: 8 })
  zipCode: string

  @Column('varchar', { name: 'address', length: 255 })
  address: string

  @Column('varchar', { name: 'number', length: 10 })
  number: string

  @Column('varchar', { name: 'complement', nullable: true, length: 255 })
  complement?: string | null

  @Column('varchar', { name: 'neighborhood', length: 255 })
  neighborhood: string

  @Column('varchar', { name: 'city', length: 255 })
  city: string

  @Column('varchar', { name: 'state', length: 2 })
  state: string

  @Column('varchar', { name: 'latitude', nullable: true, length: 20 })
  latitude?: string | null

  @Column('varchar', { name: 'longitude', nullable: true, length: 20 })
  longitude?: string | null

  @Column('tinyint', { name: 'isActive', default: () => true })
  isActive: boolean

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt?: Date | null

  @Column('int', { name: 'clientId', nullable: true, unsigned: true })
  clientId?: number | null

  @Column('int', { nullable: true, unsigned: true })
  businessUnitId?: number | null

  @Column('int', { nullable: true, unsigned: true })
  userId?: number | null

  @ManyToOne(() => ClientEntity, (client) => client.addresses, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  client?: ClientEntity
}
