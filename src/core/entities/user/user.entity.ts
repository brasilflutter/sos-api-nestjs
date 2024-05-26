import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number
  @Column('varchar', { name: 'email', length: 255, unique: true })
  email: string
  @Column('varchar', { name: 'password', length: 255 })
  password: string
  @Column('varchar', { name: 'name', length: 255 })
  name: string
  @Column('varchar', { name: 'photo', length: 255 })
  photo: string
  @Column('boolean', { name: 'isActive' })
  isActive: boolean
  @Column('timestamp', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date
  @Column('timestamp', {
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date
  @Column('timestamp', { name: 'deletedAt', nullable: true })
  deletedAt?: Date | null

  constructor(partial?: Partial<UserEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
