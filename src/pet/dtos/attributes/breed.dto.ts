import { ApiProperty } from '@nestjs/swagger'
import { BreedEntity } from '@/core/entities/pets/breed.entity'

export class BreedDto {
  @ApiProperty({ type: 'number', example: 1 })
  id: number
  @ApiProperty({ type: 'string', readOnly: true, example: 'Chiuhauha' })
  name: string
  @ApiProperty({ type: 'string', readOnly: true })
  description: string

  constructor(partial?: Partial<BreedDto>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  static fromEntity(entity: BreedEntity): BreedDto {
    const dto = { ...entity } as unknown as BreedDto
    return new BreedDto({ ...dto })
  }

  static fromForm(entity: BreedDto): BreedDto {
    return new BreedDto({ ...entity })
  }

  toEntity(): BreedEntity {
    const dto = { ...this } as unknown as BreedEntity
    return new BreedEntity({ ...dto })
  }
}
