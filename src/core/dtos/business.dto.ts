import { BusinessEntity } from '@/core/entities/business.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class BusinessDto {
  constructor(partial?: Partial<BusinessDto>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
  @ApiProperty({ type: 'number', required: false })
  id?: number

  @MinLength(5)
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  name: string

  @ApiProperty({ type: 'boolean', required: true })
  isActive: boolean

  static fromForm(entity: BusinessDto): BusinessDto {
    const dto = new BusinessDto({ ...entity })
    return dto
  }

  static fromEntity(entity: BusinessEntity): BusinessDto {
    const businessDto = { ...entity } as unknown as BusinessDto
    const dto = new BusinessDto({ ...businessDto })
    return dto
  }

  toEntity(): BusinessEntity {
    return { ...this } as unknown as BusinessEntity
  }
}
