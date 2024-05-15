import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('tinyint', { name: 'isActive', default: () => "'1'" })
  isActive: number

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
