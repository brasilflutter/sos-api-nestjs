import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelSignpost')
export class ImovelSignpostEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'imovelId', unsigned: true })
  imovelId: number

  @Column('enum', {
    name: 'classified',
    enum: ['sale', 'rent', 'negotiate', 'saleOrRent'],
    default: () => "'sale'",
  })
  classified: 'sale' | 'rent' | 'negotiate' | 'saleOrRent'

  @Column('enum', { name: 'material', enum: ['stick', 'signpost', 'other'] })
  material: 'stick' | 'signpost' | 'other'

  @Column('datetime', { name: 'placedAt' })
  placedAt: Date

  @Column('datetime', { name: 'removedAt', nullable: true })
  removedAt: Date | null

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
