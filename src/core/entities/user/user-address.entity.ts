import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AddressEntity } from '@/core/entities/address.entity'
import { UserEntity } from '@/core/entities/user/user.entity'

@Entity('user_addresses')
export class UserAddressEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  idUser: number

  @Column()
  idAddress: number

  // @ManyToOne(() => AddressEntity, (address) => address.userAddresses)
  // address: AddressEntity

  // @ManyToOne(() => UserEntity, (user) => user.userAddresses)
  // user: UserEntity
}
