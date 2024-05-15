import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('upload')
export class UploadEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('varchar', {
    name: 'realName',
    comment: 'Nome original do arquivo',
    length: 255,
  })
  realName: string

  @Column('varchar', { name: 'name', comment: 'Nome do arquivo', length: 255 })
  name: string

  @Column('varchar', {
    name: 'path',
    comment: 'Caminho do arquivo',
    length: 255,
  })
  path: string

  @Column('varchar', {
    name: 'title',
    comment: 'Título do arquivo',
    length: 255,
  })
  title: string

  @Column('varchar', {
    name: 'subtitle',
    comment: 'Subtítulo do arquivo',
    length: 255,
  })
  subtitle: string

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
