import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelCustomTax')
export class ImovelCustomTaxEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', {
    name: 'businessId',
    nullable: true,
    comment: 'Caso a taxa seja específica para um negócio',
    unsigned: true,
  })
  businessId: number | null

  @Column('int', {
    name: 'businessUnitId',
    nullable: true,
    comment: 'Caso a taxa seja específica para uma unidade de negócio',
    unsigned: true,
  })
  businessUnitId: number | null

  @Column('int', {
    name: 'imovelId',
    nullable: true,
    comment:
      'Caso a taxa seja específica para um imóvel, se for nula, é uma taxa padrão',
    unsigned: true,
  })
  imovelId: number | null

  @Column('text', { name: 'description', comment: 'Descrição da taxa' })
  description: string

  @Column('decimal', {
    name: 'value',
    comment: 'Valor da taxa',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  value: string
}
