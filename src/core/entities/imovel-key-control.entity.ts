import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelKeyControl')
export class ImovelKeyControlEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'imovelId', unsigned: true })
  imovelId: number

  @Column('varchar', { name: 'value', length: 255 })
  value: string

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
