import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('userHasProfile')
export class UserHasProfileEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  @Column('int', { name: 'businessId', unsigned: true })
  businessId: number

  @Column('int', { name: 'businessUnitId', unsigned: true })
  businessUnitId: number

  @Column('int', { primary: true, name: 'userId', unsigned: true })
  userId: number

  @Column('int', { primary: true, name: 'profileId', unsigned: true })
  profileId: number
}
