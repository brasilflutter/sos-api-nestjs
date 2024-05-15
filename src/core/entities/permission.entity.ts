import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('permission')
export class PermissionEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('tinyint', { name: 'isActive', default: () => true })
  isActive: boolean
}
