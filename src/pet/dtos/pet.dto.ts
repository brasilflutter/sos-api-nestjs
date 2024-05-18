import { PetStatusEnum } from '@/core/enums/pet-status.enum'
import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PetDto {
  @IsNumber()
  idSpecimen: number

  @IsNumber()
  idBreed: number

  @IsNumber()
  idSize: number

  @ApiProperty({
    description:
      'Um Campo de texto que descreve o animal a bel prazer do responsável pelo cadastro',
    example: 'Animal dócil, brincalhão e muito amigável.',
  })
  @IsString()
  description?: string

  @ApiProperty({
    description: 'Local onde o animal foi visto pela última vez',
    example: 'Rua do Leite, nº 0',
  })
  lastSeenLocation?: string

  @ApiProperty({
    description: 'Status do animal',
    example: 'LOST',
  })
  status: PetStatusEnum

  @ApiProperty({
    description: 'Status do animal',
    example: 'LOST',
  })
  @IsString({ each: true })
  colors: string[]

  @ApiProperty({
    description: 'Imagens do animal',
    example: 'LOST',
  })
  @IsString({ each: true })
  images: string[]
}
