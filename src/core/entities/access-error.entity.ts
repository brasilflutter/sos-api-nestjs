import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accessError')
export class AccessErrorEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { length: 30 })
  email: string

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
