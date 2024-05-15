import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('module')
export class ModuleEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'icon', nullable: true, length: 255 })
  icon: string | null

  @Column('int', { name: 'position', unsigned: true, default: () => "'0'" })
  position: number

  @Column('tinyint', { name: 'isActive', default: () => "'1'" })
  isActive: number
}
