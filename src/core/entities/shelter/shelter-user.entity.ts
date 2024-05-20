import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserRoleEnum } from '@/core/enums/user-role.enum'

@Entity('shelter_users')
export class ShelterUserEntity {
  constructor(partial?: Partial<ShelterUserEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column({ name: 'idShelter', unsigned: true })
  idShelter: number

  @Column({ name: 'idUser', unsigned: true })
  idUser: number

  @Column({ name: 'role', enum: UserRoleEnum })
  status: UserRoleEnum

  @Column({ name: 'index', unsigned: true, default: 0 })
  index: number
}
