import { PetColorsTypeEnum } from '@/core/enums/pet-colors-type.enum'
import { ApiProperty } from '@nestjs/swagger'

export class PetColorsDto {
  @ApiProperty({ type: 'number', example: 1 })
  id: number

  @ApiProperty({ type: 'string', readOnly: true, example: 'Caramelo' })
  idColor: number

  @ApiProperty({
    type: PetColorsTypeEnum,
    readOnly: true,
    enum: PetColorsTypeEnum,
    example: PetColorsTypeEnum.MAIN,
  })
  type: PetColorsTypeEnum

  constructor(partial?: Partial<PetColorsDto>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  static fromEntity(entity: PetColorsDto): PetColorsDto {
    const dto = { ...entity } as unknown as PetColorsDto
    return new PetColorsDto({ ...dto })
  }

  static fromForm(entity: PetColorsDto): PetColorsDto {
    return new PetColorsDto({ ...entity })
  }

  toEntity(): PetColorsDto {
    const entity = { ...this } as unknown as PetColorsDto
    return new PetColorsDto({ ...entity })
  }
}
