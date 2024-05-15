'@/core/entities/businessUnit.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelCustomDetail')
export class ImovelCustomDetailEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', {
    name: 'businessId',
    nullable: true,
    comment: 'Caso seja nulo, o campo é global',
    unsigned: true,
  })
  businessId: number | null

  @Column('int', {
    name: 'businessUnitId',
    nullable: true,
    comment: 'Caso seja nulo, o campo é global',
    unsigned: true,
  })
  businessUnitId: number | null

  @Column('varchar', { name: 'name', comment: 'Nome do campo', length: 255 })
  name: string

  @Column('enum', {
    name: 'type',
    comment: 'Tipo do campo',
    enum: ['text', 'number', 'date', 'checkbox', 'select', 'radio'],
    default: () => "'text'",
  })
  type: 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'radio'

  @Column('json', {
    name: 'options',
    nullable: true,
    comment: 'Opções para campos do tipo select e radio',
  })
  options: object | null

  @Column('text', { name: 'value', nullable: true, comment: 'Valor do campo' })
  value: string | null

  @Column('tinyint', {
    name: 'mandatory',
    comment: 'Campo obrigatório',
    default: () => "'0'",
  })
  mandatory: number

  @Column('text', { name: 'info', nullable: true })
  info: string | null

  @Column('tinyint', {
    name: 'isActive',
    comment: 'Campo ativo',
    default: () => "'1'",
  })
  isActive: number

  @Column('int', {
    name: 'position',
    comment: 'Posição do campo',
    unsigned: true,
    default: () => "'0'",
  })
  position: number

  @Column('int', {
    name: 'imovelCategoryDetailId',
    comment: 'id da categoria do detalhamento do imóvel',
  })
  imovelCategoryDetailId: number

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
