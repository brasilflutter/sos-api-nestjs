import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('imovelHasUpload')
export class ImovelHasUploadEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'imovelId', unsigned: true })
  imovelId: number

  @Column('int', { name: 'uploadId', unsigned: true })
  uploadId: number

  @Column('int', {
    name: 'position',
    comment: 'posição da foto',
    unsigned: true,
    default: () => "'0'",
  })
  position: number

  @Column('tinyint', { name: 'isBanner', default: () => "'0'" })
  isBanner: number

  @Column('tinyint', {
    name: 'isActive',
    comment: 'foto ativa',
    default: () => "'1'",
  })
  isActive: number

  @Column('tinyint', {
    name: 'isMain',
    comment: 'foto principal',
    default: () => "'0'",
  })
  isMain: number

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
