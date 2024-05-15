import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', unsigned: true })
  businessId: number

  @Column('int', { name: 'businessUnitId', unsigned: true })
  businessUnitId: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'email', length: 255 })
  email: string

  @Column('varchar', { name: 'password', length: 127 })
  password: string

  @Column('enum', {
    name: 'role',
    enum: ['admin', 'user'],
    default: () => "'user'",
  })
  role: 'admin' | 'user'

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { nullable: true })
  deletedAt: Date | null

  @Column('tinyint', { default: () => true })
  isActive: boolean

  @Column('datetime', { nullable: true })
  lastLogin: Date | null
}
