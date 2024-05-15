import { HttpMethodEnum } from '@/core/enums/http-method.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('routine')
export class RoutineEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { unsigned: true })
  moduleId: number

  @Column('varchar', { length: 255 })
  name: string

  @Column('varchar', { length: 255 })
  resource: string

  @Column('varchar', { length: 255 })
  action: string

  @Column('tinyint', { default: () => true })
  isActive: boolean

  @Column('tinyint', { default: () => false })
  menu: boolean

  @Column('enum', {
    name: 'method',
    enum: HttpMethodEnum,
    default: () => "'GET'",
  })
  method: HttpMethodEnum
}
