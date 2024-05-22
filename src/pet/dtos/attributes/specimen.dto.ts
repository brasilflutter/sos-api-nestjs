import { ApiProperty } from '@nestjs/swagger'
import { BreedEntity } from '@/core/entities/pets/breed.entity'
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

  static fromEntity(entity: BreedEntity): SpecimenDto {
    const dto = { ...entity } as unknown as SpecimenDto
    return new SpecimenDto({ ...dto })
  }

  static fromForm(entity: SpecimenDto): SpecimenDto {
    return new SpecimenDto({ ...entity })
  }

  toEntity(): SpecimenEntity {
    const dto = { ...this } as unknown as SpecimenEntity
    return new SpecimenEntity({ ...dto })
  }
}
