import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('business')
export class BusinessEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null

  @Column('tinyint', { name: 'isActive', default: () => "'1'" })
  isActive: boolean
}
