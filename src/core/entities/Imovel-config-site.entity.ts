import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelConfigSite')
export class ImovelConfigSiteEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'imovelId', unsigned: true })
  imovelId: number

  @Column('tinyint', {
    name: 'publish',
    comment: 'Publicar imóvel no site',
    default: () => "'0'",
  })
  publish: number

  @Column('tinyint', {
    name: 'highlight',
    comment: 'Destaque no site',
    default: () => "'0'",
  })
  highlight: number

  @Column('tinyint', {
    name: 'superHighlight',
    comment: 'Super destaque no site',
    default: () => "'0'",
  })
  superHighlight: number

  @Column('varchar', {
    name: 'youtubeLink',
    comment: 'Link do vídeo do youtube',
    length: 255,
  })
  youtubeLink: string

  @Column('varchar', {
    name: 'virtualTourLink',
    comment: 'Link do tour virtual',
    length: 255,
  })
  virtualTourLink: string

  @Column('text', {
    name: 'description',
    comment: 'Descrição do imóvel no site',
  })
  description: string

  @Column('varchar', {
    name: 'seoTitle',
    comment: 'Título para SEO',
    length: 255,
  })
  seoTitle: string

  @Column('varchar', {
    name: 'seoDescription',
    comment: 'Descrição para SEO',
    length: 255,
  })
  seoDescription: string

  @Column('varchar', {
    name: 'seoKeywords',
    comment: 'Palavras-chave para SEO',
    length: 255,
  })
  seoKeywords: string

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
