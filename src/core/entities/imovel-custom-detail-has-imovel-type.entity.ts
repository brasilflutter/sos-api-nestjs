import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelCustomDetailHasImovelType')
export class ImovelCustomDetailHasImovelTypeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', {
    name: 'imovelCustomDetailId',
    comment: 'id do Campo customizado',
    unsigned: true,
  })
  imovelCustomDetailId: number

  @Column('int', {
    name: 'imovelTypeId',
    comment: 'id do tipo de imóvel',
    unsigned: true,
  })
  imovelTypeId: number
}
