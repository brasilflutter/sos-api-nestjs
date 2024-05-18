import { PetStatusEnum } from '@/core/enums/pet-status.enum'
import { PetColorsDto } from '@/pet/dtos/pet-colors.dto'
import { PetImagesDto } from '@/pet/dtos/pet-images.dto'
import { ApiProperty } from '@nestjs/swagger'

export class PetDto {
  @ApiProperty({
    example: '0',
    required: true,
  })
  id: number
  idSpecimen: number
  idBreed: number
  idSize: number
  description?: string
  lastSeenLocation?: string
  status: PetStatusEnum
  createdAt: Date
  updatedAt?: Date
  colors: PetColorsDto[]
  images: PetImagesDto[]
}
