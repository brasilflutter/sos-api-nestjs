import { PetStatusEnum } from '@/core/enums/pet-status.enum'
import { IsArray, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { SpecimenDto } from '@/pet/dtos/attributes/specimen.dto'
import { BreedDto } from '@/pet/dtos/attributes/breed.dto'
import { SizeDto } from '@/pet/dtos/attributes/size.dto'
import { PetEntity } from '@/core/entities/pets/pet.entity'
import { PetColorsDto } from '@/pet/dtos/pet-colors.dto'
import { PetImageDto } from '@/pet/dtos/pet-image.dto'

export class PetDto {
  @ApiProperty({
    description: 'Id do animal',
    example: 1,
    writeOnly: true,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Id da espécie animal',
    example: 1,
    writeOnly: true,
  })
  @IsNumber()
  idSpecimen: number

  @ApiProperty({
    description: 'Id da raça animal',
    example: 1,
    writeOnly: true,
  })
  @IsNumber()
  idBreed: number

  @ApiProperty({
    description: 'Id do tamanho do animal',
    example: 1,
    writeOnly: true,
  })
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
    example: PetStatusEnum.MISSING,
    enum: PetStatusEnum,
  })
  status: PetStatusEnum

  @ApiProperty({
    description: 'Id das Cores do animal',
    writeOnly: true,
    type: Number,
    isArray: true,
  })
  @IsArray({})
  colorIds: number[]

  @ApiProperty({ type: [PetColorsDto], readOnly: true })
  colors: PetColorsDto[]

  @ApiProperty({
    type: SpecimenDto,
    nullable: true,
    readOnly: true,
  })
  specimen?: SpecimenDto

  @ApiProperty({
    type: BreedDto,
    nullable: true,
    readOnly: true,
  })
  breed?: BreedDto

  @ApiProperty({
    type: SizeDto,
    nullable: true,
    readOnly: true,
  })
  size?: SizeDto

  @ApiProperty({
    description: 'Imagens do animal',
    type: [PetImageDto],
  })
  @IsArray({})
  images: PetImageDto[]

  static fromEntity(pet: PetEntity): PetDto {
    const petResponse = new PetDto()
    petResponse.id = pet.id
    petResponse.idSpecimen = pet.idSpecimen
    petResponse.idBreed = pet.idBreed
    petResponse.idSize = pet.idSize
    petResponse.description = pet.description
    petResponse.lastSeenLocation = pet.lastSeenLocation
    petResponse.status = pet.status

    if (pet.specimen) {
      petResponse.specimen = SpecimenDto.fromEntity(pet.specimen)
    }

    if (pet.breed) {
      petResponse.breed = BreedDto.fromEntity(pet.breed)
    }

    if (pet.size) {
      petResponse.size = SizeDto.fromEntity(pet.size)
    }

    // if (pet.colors) {
    //   petResponse.colors = pet.colors.map((color) =>
    //     PetColorsDto.fromEntity(color),
    //   )
    // }

    // if (pet.images) {
    //   petResponse.images = pet.images.map((image) =>
    //     PetImageDto.fromEntity(image),
    //   )
    // }

    return petResponse
  }

  toEntity(): Partial<PetEntity> {
    const petEntity = new PetEntity()
    petEntity.id = this.id
    petEntity.idSpecimen = this.idSpecimen
    petEntity.idBreed = this.idBreed
    petEntity.idSize = this.idSize
    petEntity.description = this.description
    petEntity.lastSeenLocation = this.lastSeenLocation
    petEntity.status = this.status

    // Assuming you handle colorIds separately to link with PetColorsEntity
    // if (this.colorIds) {
    //   petEntity.colors = this.colorIds.map((id) => {
    //     const color = new PetColorsEntity()
    //     color.id = id
    //     return color
    //   })
    // }

    return petEntity
  }
}
