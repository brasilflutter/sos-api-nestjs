import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('clientHasUpload')
export class ClientHasUploadEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'clientId', unsigned: true })
  clientId: number

  @Column('int', { name: 'uploadId', unsigned: true })
  uploadId: number

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null
}
