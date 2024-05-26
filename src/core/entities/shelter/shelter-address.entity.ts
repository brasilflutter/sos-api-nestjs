import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AddressEntity } from '@/core/entities/address.entity'
import { ShelterEntity } from '@/core/entities/shelter/shelter.entity' // Assuming you have a ShelterEntity defined

@Entity('shelter_addresses')
export class ShelterAddressEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  idShelter: number

  @Column()
  idAddress: number

  @ManyToOne(() => AddressEntity, (address) => address.shelterAddresses)
  address: AddressEntity

  // @ManyToOne(() => ShelterEntity, (shelter) => shelter.shelterAddresses)
  // shelter: ShelterEntity
}
