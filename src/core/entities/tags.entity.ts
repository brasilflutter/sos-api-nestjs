import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tags')
export class TagsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', nullable: true, unsigned: true })
  businessId: number | null

  @Column('int', { name: 'businessUnitId', nullable: true, unsigned: true })
  businessUnitId: number | null

  @Column('varchar', { name: 'name', length: 255 })
  name: string
}
