import { AddressDto } from '@/address/dtos/address.dto'
import { ActiveStatusEnum } from '@/core/enums/active-status.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsObject, IsString } from 'class-validator'
import { ShelterEntity } from '@/core/entities/shelter/shelter.entity'

export class ShelterDto {
  constructor(partial: Partial<ShelterDto>) {
    Object.assign(this, partial)
  }

  @ApiProperty({
    example: 'Abrigo de animais do João',
    required: true,
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'Status do abrigo',
    required: true,
  })
  @IsEnum(ActiveStatusEnum, {
    message: 'Status deve ser um valor válido',
  })
  status: ActiveStatusEnum

  @ApiProperty({
    example: 'Endereços do abrigo',
    required: true,
  })
  @IsArray()
  @IsObject({ each: true })
  addresses: AddressDto[]

  static fromEntity(shelter: ShelterEntity) {
    return new ShelterDto({
      name: shelter.name,
      status: shelter.status,
      // addresses: shelter.addresses.map((address) =>
      //   AddressDto.fromEntity(address),
      // ),
    })
  }

  toEntity(): Partial<ShelterEntity> {
    return new ShelterEntity({
      name: this.name,
      status: this.status,
      // addresses: this.addresses.map((address) => address.toEntity()),
    })
  }
}
