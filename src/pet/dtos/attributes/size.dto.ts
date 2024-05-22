import { ApiProperty } from '@nestjs/swagger'
import { SizeEntity } from '@/core/entities/pets/size.entity'

export class SizeDto {
  @ApiProperty({ type: 'number' })
  id: number
  @ApiProperty({ type: 'string', readOnly: true, example: 'Pequeno' })
  name: string
  @ApiProperty({ type: 'string', readOnly: true, example: 'Pequeno' })
  description: string

  constructor(partial?: Partial<SizeDto>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  static fromEntity(entity: SizeEntity): SizeDto {
    const dto = { ...entity } as unknown as SizeDto
    return new SizeDto({ ...dto })
  }

  static fromForm(entity: SizeEntity): SizeDto {
    return new SizeDto({ ...entity })
  }

  toEntity(): SizeEntity {
    const dto = { ...this } as unknown as SizeEntity
    return new SizeEntity({ ...dto })
  }
}
