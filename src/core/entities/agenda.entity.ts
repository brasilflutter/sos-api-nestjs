import { AgendaPriorityEnum } from '@/core/enums/agenda.priority.enum'
import { AgendaStatusEnum } from '@/core/enums/agenda.status.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity(
  'agenda', // table name
)
export class AgendaEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', nullable: true, unsigned: true })
  businessId: number | null

  @Column('int', { name: 'businessUnitId', nullable: true, unsigned: true })
  businessUnitId: number | null

  @Column('int', { name: 'userId', nullable: true, unsigned: true })
  userId: number | null

  @Column('int', { name: 'clientId', nullable: true, unsigned: true })
  clientId: number | null

  @Column('datetime', { name: 'dateAt' })
  dateAt: Date

  @Column('datetime', { name: 'dateUntil', nullable: true })
  dateUntil: Date | null

  @Column('text', { name: 'description' })
  description: string

  @Column('enum', { name: 'priority', enum: AgendaPriorityEnum })
  priority: AgendaPriorityEnum

  @Column('enum', {
    name: 'status',
    enum: AgendaStatusEnum,
  })
  status: AgendaStatusEnum

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
