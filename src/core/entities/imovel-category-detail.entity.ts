import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelCategoryDetail')
export class ImovelCategoryDetailEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: 'Categoria do detalhamento do imóvel',
    length: 255,
  })
  name: string | null

  @Column('tinyint', {
    name: 'isActive',
    comment: 'Ativo',
    default: () => true,
  })
  isActive: boolean
}
