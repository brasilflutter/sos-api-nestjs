import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accessLog')
export class AccessLogEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { unsigned: true })
  userId: number

  @Column('varchar', { length: 30 })
  ipAddress: string

  @Column('text')
  userAgent: string

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
