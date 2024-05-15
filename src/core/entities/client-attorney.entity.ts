import { ClientEntity } from '@/core/entities/client.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('clientAttorney')
export class ClientAttorneyEntity {
  constructor(partial?: Partial<ClientAttorneyEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'clientId', nullable: false, default: 1 })
  clientId: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'email', length: 255 })
  email: string

  @Column('varchar', { name: 'phone', length: 20 })
  phone: string

  @Column('varchar', { name: 'cpfCnpj', length: 20 })
  cpfCnpj: string

  @Column('varchar', { name: 'document', comment: 'RG, CNH, etc', length: 50 })
  document: string

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null

  @ManyToOne('ClientEntity', 'clientAttorneys')
  client: ClientEntity
}
