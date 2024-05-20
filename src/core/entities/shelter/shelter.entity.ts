import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ActiveStatusEnum } from '@/core/enums/active-status.enum'

@Entity('shelters')
export class ShelterEntity {
  constructor(partial?: Partial<ShelterEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ name: 'name', unsigned: true })
  name: string

  @Column({ name: 'status', enum: ActiveStatusEnum })
  status: ActiveStatusEnum

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
}
