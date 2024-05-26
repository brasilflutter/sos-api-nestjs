import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ShelterAddressEntity } from '@/core/entities/shelter/shelter-address.entity'

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  number: string

  @Column({ nullable: true })
  street: string

  @Column({ nullable: true })
  neighborhood: string

  @Column({ nullable: true })
  city: string

  @Column({ nullable: true })
  state: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  zip: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  complement: string

  @Column('float8', { nullable: true })
  latitude: number

  @Column('float8', { nullable: true })
  longitude: number

  @Column({ nullable: true })
  index: number

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deletedAt', nullable: true })
  deletedAt?: Date

  @OneToMany(
    () => ShelterAddressEntity,
    (shelterAddress) => shelterAddress.address,
  )
  shelterAddresses: ShelterAddressEntity[]

  // @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.address)
  // userAddresses: UserAddressEntity[]
}
