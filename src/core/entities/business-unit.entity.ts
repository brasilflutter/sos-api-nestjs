import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity(
  'businessUnit', // table name
)
export class BusinessUnitEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', nullable: true, unsigned: true })
  businessId: number | null

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'companyName', length: 255 })
  companyName: string

  @Column('varchar', { name: 'fantasyName', length: 255 })
  fantasyName: string

  @Column('varchar', { name: 'cnpjCpf', length: 18 })
  cnpjCpf: string

  @Column('tinyint', { name: 'isActive', default: () => true })
  isActive: boolean

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
