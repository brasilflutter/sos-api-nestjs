import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', nullable: true, unsigned: true })
  businessId: number | null

  @Column('int', { name: 'businessUnitId', nullable: true, unsigned: true })
  businessUnitId: number | null

  @Column('int', { name: 'userId', nullable: true, unsigned: true })
  userId: number | null

  @Column('varchar', { name: 'title', length: 255 })
  title: string

  @Column('text', { name: 'message' })
  message: string

  @Column('json', {
    name: 'action',
    nullable: true,
    comment: 'Ação a ser executada ao clicar na notificacao',
  })
  action: object | null

  @Column('tinyint', { name: 'isRead', default: () => "'0'" })
  isRead: number

  @Column('datetime', { name: 'readAt', nullable: true })
  readAt: Date | null

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
