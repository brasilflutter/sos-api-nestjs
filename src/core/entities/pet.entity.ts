import { PetColorsEntity } from '@/core/entities/pet-colors.entity'
import { PetStatusEnum } from '@/core/enums/pet-status.enum'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pets')
export class PetEntity {
  constructor(partial?: Partial<PetEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'idSpeciment', unsigned: true })
  idSpeciment: number

  @Column('int', { name: 'idBreed', unsigned: true })
  idBreed: number

  @Column('int', { name: 'idSize', unsigned: true })
  idSize: number

  @Column('varchar', { name: 'description', length: 255, nullable: true })
  description: string

  @Column('varchar', { name: 'lastSeenLocation', length: 255, nullable: true })
  lastSeenLocation: string

  @Column('enum', { name: 'status', enum: PetStatusEnum })
  status: string

  @Column('timestamp', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @Column('timestamp', {
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @Column('timestamp', { name: 'deletedAt', nullable: true })
  deletedAt?: Date | null

  @OneToMany(() => PetColorsEntity, (petColors) => petColors.pet)
  colors: PetColorsEntity[]
}
