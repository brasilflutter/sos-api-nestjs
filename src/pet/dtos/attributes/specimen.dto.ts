import { ApiProperty } from '@nestjs/swagger'
import { SpecimenEntity } from '@/core/entities/pets/specimen.entity'

export class SpecimenDto {
  @ApiProperty({ type: 'number' })
  id: number
  @ApiProperty({ type: 'string', readOnly: true, example: 'Cachorro' })
  name: string
  @ApiProperty({ type: 'string', readOnly: true })
  description: string

  constructor(partial?: Partial<SpecimenDto>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  static fromEntity(entity: SpecimenEntity): SpecimenDto {
    const dto = new SpecimenDto()
    dto.id = entity.id
    dto.name = entity.name
    dto.description = entity.description
    // dto.breeds = entity.breeds

    return dto
  }

  static fromForm(entity: SpecimenDto): SpecimenDto {
    return new SpecimenDto({ ...entity })
  }

  toEntity(): SpecimenEntity {
    const dto = { ...this } as unknown as SpecimenEntity
    return new SpecimenEntity({ ...dto })
  }
}
