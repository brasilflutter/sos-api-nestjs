import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelType')
export class ImovelTypeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', nullable: true, unsigned: true })
  businessId: number | null

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('tinyint', { name: 'isActive', default: () => true })
  isActive: boolean
}
