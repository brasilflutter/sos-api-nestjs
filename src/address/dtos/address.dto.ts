import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { AddressEntity } from '@/core/entities/address.entity'

export class AddressDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number

  @ApiProperty({ example: 'Home', nullable: true })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ example: '123', nullable: true })
  @IsString()
  @IsOptional()
  number?: string

  @ApiProperty({ example: 'Main St', nullable: true })
  @IsString()
  @IsOptional()
  street?: string

  @ApiProperty({ example: 'Downtown', nullable: true })
  @IsString()
  @IsOptional()
  neighborhood?: string

  @ApiProperty({ example: 'New York', nullable: true })
  @IsString()
  @IsOptional()
  city?: string

  @ApiProperty({ example: 'NY', nullable: true })
  @IsString()
  @IsOptional()
  state?: string

  @ApiProperty({ example: 'USA', nullable: true })
  @IsString()
  @IsOptional()
  country?: string

  @ApiProperty({ example: '10001', nullable: true })
  @IsString()
  @IsOptional()
  zip?: string

  @ApiProperty({ example: 'Near Central Park', nullable: true })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ example: 'Apt 1', nullable: true })
  @IsString()
  @IsOptional()
  complement?: string

  @ApiProperty({ example: 40.7128, nullable: true })
  @IsNumber()
  @IsOptional()
  latitude?: number

  @ApiProperty({ example: -74.006, nullable: true })
  @IsNumber()
  @IsOptional()
  longitude?: number

  @ApiProperty({ example: 1, nullable: true })
  @IsNumber()
  @IsOptional()
  index?: number

  static fromEntity(address: AddressEntity): AddressDto {
    const dto = new AddressDto()
    dto.id = address.id
    dto.name = address.name
    dto.number = address.number
    dto.street = address.street
    dto.neighborhood = address.neighborhood
    dto.city = address.city
    dto.state = address.state
    dto.country = address.country
    dto.zip = address.zip
    dto.description = address.description
    dto.complement = address.complement
    dto.latitude = address.latitude
    dto.longitude = address.longitude
    dto.index = address.index
    return dto
  }

  static toEntity(dto: AddressDto): Partial<AddressEntity> {
    const address = new AddressEntity()
    address.id = dto.id
    address.name = dto.name
    address.number = dto.number
    address.street = dto.street
    address.neighborhood = dto.neighborhood
    address.city = dto.city
    address.state = dto.state
    address.country = dto.country
    address.zip = dto.zip
    address.description = dto.description
    address.complement = dto.complement
    address.latitude = dto.latitude
    address.longitude = dto.longitude
    address.index = dto.index
    return address
  }
}
