import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class AddressDto {
  constructor(partial: Partial<AddressDto>) {
    Object.assign(this, partial)
  }

  @ApiProperty({
    example: 'Residencial',
    required: true,
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'Descrição do endereço',
    required: true,
  })
  @IsString()
  description: string

  @ApiProperty({
    example: 'Rua das Flores',
    required: true,
  })
  @IsString()
  street: string

  @ApiProperty({
    example: '123',
    required: true,
  })
  @IsString()
  number: string

  @ApiProperty({
    example: 'Casa',
    required: true,
  })
  @IsString()
  complement: string

  @ApiProperty({
    example: 'Bairro',
    required: true,
  })
  @IsString()
  neighborhood: string

  @ApiProperty({
    example: 'Cidade',
    required: true,
  })
  @IsString()
  city: string

  @ApiProperty({
    example: 'Estado',
    required: true,
  })
  @IsString()
  state: string

  @ApiProperty({
    example: 'País',
    required: true,
  })
  @IsString()
  country: string

  @ApiProperty({
    example: 'CEP',
    required: true,
  })
  @IsString()
  zip: string

  @ApiProperty({
    example: 'Latitude',
    required: true,
  })
  @IsNumber()
  latitude: number

  @ApiProperty({
    example: 'Longitude',
    required: true,
  })
  @IsNumber()
  longitude: number

  @ApiProperty({
    example: '0',
    required: true,
  })
  @IsString()
  index: string
}
