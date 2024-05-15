import { AddressEntity } from '@/core/entities/address.entity'
import { BusinessUnitEntity } from '@/core/entities/business-unit.entity'
import { BusinessEntity } from '@/core/entities/business.entity'
import { ClientAttorneyEntity } from '@/core/entities/client-attorney.entity'
import { ClientScholarityEnum } from '@/core/enums/client.scholarity.enum'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('client')
export class ClientEntity {
  constructor(partial?: Partial<ClientEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', unsigned: true })
  businessId: number

  @Column('int', { name: 'businessUnitId', unsigned: true })
  businessUnitId: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'email', length: 255 })
  email: string

  @Column('varchar', { name: 'phone', length: 20 })
  phone: string

  @Column('varchar', { name: 'cpfCnpj', length: 20 })
  cpfCnpj: string

  @Column('varchar', { name: 'document', comment: 'RG, CNH, etc', length: 50 })
  document: string

  @Column('date', { name: 'birthDate', comment: 'Data de nascimento' })
  birthDate: Date

  @Column('enum', { name: 'gender', enum: ['male', 'female', 'other'] })
  gender: 'male' | 'female' | 'other'

  @Column('varchar', {
    name: 'nacionality',
    comment: 'Nacionalidade',
    length: 255,
  })
  nacionality: string

  @Column('varchar', {
    name: 'bornPlace',
    comment: 'Naturalidade',
    length: 255,
  })
  bornPlace: string

  @Column('varchar', { name: 'occupation', comment: 'Profissão', length: 255 })
  occupation: string

  @Column('enum', {
    name: 'civilStatus',
    comment: 'Estado civil',
    enum: ['single', 'married', 'divorced', 'widowed'],
  })
  civilStatus: 'single' | 'married' | 'divorced' | 'widowed'

  @Column('enum', {
    name: 'scholarity',
    nullable: true,
    comment: 'Escolaridade',
    enum: ClientScholarityEnum,
  })
  scholarity: ClientScholarityEnum | null

  @Column('decimal', {
    name: 'income',
    comment: 'Renda mensal',
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  income: number

  @Column('int', {
    name: 'quantityDependents',
    unsigned: true,
    default: () => "'0'",
  })
  quantityDependents: number

  @Column('tinyint', {
    name: 'hasAttorney',
    comment: 'Possui procurador',
    default: () => "'0'",
  })
  hasAttorney: boolean

  @Column('tinyint', { name: 'isActive', default: () => "'1'" })
  isActive: boolean

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null

  @ManyToOne(() => BusinessEntity, (business) => business.id)
  @JoinColumn({ name: 'businessId', referencedColumnName: 'id' })
  business: BusinessEntity

  @OneToMany(() => AddressEntity, (address) => address.client, {
    cascade: true,
  })
  @JoinColumn({ name: 'businessId', referencedColumnName: 'clientId' })
  addresses: AddressEntity[]

  @ManyToOne(() => BusinessUnitEntity, (businessUnit) => businessUnit.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'businessUnitId', referencedColumnName: 'id' })
  businessUnit: BusinessUnitEntity

  @OneToMany(() => ClientAttorneyEntity, (attorney) => attorney.client, {
    cascade: true,
  })
  attorneys: ClientAttorneyEntity[]
}
