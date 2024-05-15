import { AddressEntity } from '@/core/entities/address.entity'
import { ApiProperty } from '@nestjs/swagger'

export class AddressDto {
  constructor(partial?: Partial<AddressDto>) {
    if (partial) {
      Object.assign(this, partial)
      this.zipCode = partial.zipCode.replaceAll(/\D/g, '')
    }
  }

  @ApiProperty({ type: 'number', required: false })
  id?: number
  @ApiProperty({ type: 'number', required: false })
  businessUnitId?: number
  @ApiProperty({ type: 'number', required: false })
  clientId?: number
  @ApiProperty({ type: 'string', required: true })
  address: string
  @ApiProperty({ type: 'string', required: false })
  number?: string
  @ApiProperty({ type: 'string', required: false })
  complemnt?: string
  @ApiProperty({ type: 'string', required: true })
  neighborhood: string
  @ApiProperty({ type: 'string', required: true })
  city: string
  @ApiProperty({ type: 'string', required: true })
  state: string
  @ApiProperty({ type: 'string', required: true })
  zipCode: string
  @ApiProperty({ type: 'string', required: true })
  latitude?: string
  @ApiProperty({ type: 'string', required: true })
  longitude?: string

  static fromEntity(entity: AddressEntity): AddressDto {
    const address = { ...entity } as unknown as AddressDto
    const addressDto = new AddressDto({ ...address })
    return addressDto
  }

  static fromForm(entity: AddressDto): AddressDto {
    const addressDto = new AddressDto({ ...entity })
    return addressDto
  }

  toEntity(): AddressEntity {
    const addressDto = { ...this } as unknown as AddressEntity
    const addressEntity = new AddressEntity({ ...addressDto })
    return addressEntity
  }
}
