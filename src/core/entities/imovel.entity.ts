import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovel')
export class ImovelEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', unsigned: true })
  businessId: number

  @Column('int', { name: 'businessUnitId', unsigned: true })
  businessUnitId: number

  @Column('int', { name: 'clientId', unsigned: true })
  clientId: number

  @Column('varchar', {
    name: 'code',
    unique: true,
    comment: 'Código alternativo do imóvel',
    length: 50,
  })
  code: string

  @Column('int', { name: 'addressId', unsigned: true })
  addressId: number

  @Column('date', {
    name: 'buildedAt',
    comment: 'Data de construção do imóvel',
  })
  buildedAt: string

  @Column('date', {
    name: 'reformAt',
    nullable: true,
    comment: 'Data da última reforma',
  })
  reformAt: string | null

  @Column('text', {
    name: 'internalInfo',
    nullable: true,
    comment: 'Informações internas',
  })
  internalInfo: string | null

  @Column('enum', {
    name: 'buildtype',
    comment: 'Tipo de construção',
    enum: [
      'residential',
      'commercial',
      'industrial',
      'rural',
      'condominium',
      'corporate',
      'other',
    ],
    default: () => "'residential'",
  })
  buildtype:
    | 'residential'
    | 'commercial'
    | 'industrial'
    | 'rural'
    | 'condominium'
    | 'corporate'
    | 'other'

  @Column('int', {
    name: 'imovelTypeId',
    comment: 'Tipo de imóvel',
    unsigned: true,
  })
  imovelTypeId: number

  @Column('enum', {
    name: 'pretension',
    comment: 'pretenção do imóvel',
    enum: ['sale', 'rent'],
    default: () => "'sale'",
  })
  pretension: 'sale' | 'rent'

  @Column('date', {
    name: 'fgtsUsedAt',
    nullable: true,
    comment: 'Data de utilização do FGTS',
  })
  fgtsUsedAt: string | null

  @Column('decimal', {
    name: 'price',
    comment: 'Preço de venda',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  price: string

  @Column('decimal', {
    name: 'evaluatedPrice',
    comment: 'Preço avaliado',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  evaluatedPrice: string

  @Column('tinyint', { name: 'isExclusive', default: () => "'0'" })
  isExclusive: number

  @Column('tinyint', { name: 'isFinaceable', default: () => "'0'" })
  isFinaceable: number

  @Column('date', {
    name: 'exclusiveAt',
    nullable: true,
    comment: 'Início da exclusividade',
  })
  exclusiveAt: string | null

  @Column('int', {
    name: 'exclusiveDays',
    comment: 'Dias de exclusividade',
    unsigned: true,
    default: () => "'0'",
  })
  exclusiveDays: number

  @Column('tinyint', {
    name: 'authorizedForCommercialization',
    comment: 'Autorizado para comercialização',
    default: () => "'0'",
  })
  authorizedForCommercialization: number

  @Column('date', {
    name: 'authorizedForCommercializationAt',
    nullable: true,
    comment: 'Autorizado para comercialização a partir de',
  })
  authorizedForCommercializationAt: string | null

  @Column('int', {
    name: 'authorizedForCommercializationDays',
    comment: 'Dias de autorização para comercialização',
    unsigned: true,
    default: () => "'0'",
  })
  authorizedForCommercializationDays: number

  @Column('enum', {
    name: 'statusImovel',
    enum: [
      'available',
      'reserved',
      'new',
      'occupied',
      'building',
      'releases',
      'uninformed',
    ],
    default: () => "'uninformed'",
  })
  statusImovel:
    | 'available'
    | 'reserved'
    | 'new'
    | 'occupied'
    | 'building'
    | 'releases'
    | 'uninformed'

  @Column('enum', {
    name: 'standardProperty',
    enum: ['poor', 'standard', 'premium', 'luxury', 'not_informed'],
  })
  standardProperty: 'poor' | 'standard' | 'premium' | 'luxury' | 'not_informed'

  @Column('enum', {
    name: 'standardLocation',
    enum: [
      'poor',
      'standard',
      'premium',
      'luxury',
      'super_luxury',
      'not_informed',
    ],
  })
  standardLocation:
    | 'poor'
    | 'standard'
    | 'premium'
    | 'luxury'
    | 'super_luxury'
    | 'not_informed'

  @Column('tinyint', { name: 'rented', default: () => "'0'" })
  rented: number

  @Column('date', {
    name: 'rentedUntil',
    nullable: true,
    comment: 'Alugado até',
  })
  rentedUntil: string | null

  @Column('enum', {
    name: 'periodIptuItr',
    comment: 'Período de cobrança',
    enum: ['isento', 'mensal', 'bimestral', 'trimestral', 'semestral', 'anual'],
    default: () => "'mensal'",
  })
  periodIptuItr:
    | 'isento'
    | 'mensal'
    | 'bimestral'
    | 'trimestral'
    | 'semestral'
    | 'anual'

  @Column('decimal', {
    name: 'valueIptuItr',
    comment: 'Valor do IPTU/ITR',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  valueIptuItr: string

  @Column('decimal', {
    name: 'condominiumValue',
    comment: 'Valor do condomínio',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  condominiumValue: string

  @Column('decimal', {
    name: 'fireInsuranceValue',
    comment: 'Valor do seguro incêndio',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  fireInsuranceValue: string

  @Column('decimal', {
    name: 'bailInsuranceValue',
    comment: 'Valor do seguro fiança',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  bailInsuranceValue: string

  @Column('json', { name: 'details', nullable: true })
  details: object | null

  @Column('json', { name: 'tags', nullable: true, comment: 'Tags do imóvel' })
  tags: object | null

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null

  @Column('tinyint', { name: 'isActive', default: () => "'1'" })
  isActive: number

  @Column('int', {
    name: 'createdBy',
    comment: 'Usuário que criou o registro',
    unsigned: true,
  })
  createdBy: number
}
