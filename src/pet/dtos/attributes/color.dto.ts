import { ApiProperty } from '@nestjs/swagger'
import { ColorEntity } from '@/core/entities/pets/color.entity'

export class ColorDto {
  @ApiProperty({ type: 'number', example: 1 })
  id: number
  @ApiProperty({ type: 'string', readOnly: true, example: 'Caramelo' })
  name: string
  @ApiProperty({ type: 'string', readOnly: true })
  description: string

  constructor(partial?: Partial<ColorDto>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  static fromEntity(entity: ColorEntity): ColorDto {
    const dto = { ...entity } as unknown as ColorDto
    return new ColorDto({ ...dto })
  }

  static fromForm(entity: ColorDto): ColorDto {
    return new ColorDto({ ...entity })
  }

  toEntity(): ColorEntity {
    const dto = { ...this } as unknown as ColorEntity
    return new ColorEntity({ ...dto })
  }
}
