import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelCommission')
export class ImovelCommissionEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'imovelId', unsigned: true })
  imovelId: number

  @Column('int', { name: 'userId', unsigned: true })
  userId: number

  @Column('decimal', {
    name: 'value',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  value: string

  @Column('enum', { name: 'typeValue', enum: ['percentage', 'fixed'] })
  typeValue: 'percentage' | 'fixed'

  @Column('enum', { name: 'typeCommission', enum: ['sold', 'rented', 'both'] })
  typeCommission: 'sold' | 'rented' | 'both'

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
