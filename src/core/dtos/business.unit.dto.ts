import { BusinessUnitEntity } from '@/core/entities/business-unit.entity'
import { ApiProperty } from '@nestjs/swagger'

export class BusinessUnitDto {
  constructor(partial?: Partial<BusinessUnitDto>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @ApiProperty({ type: 'number', required: false })
  id?: number

  @ApiProperty({ type: 'number', required: false })
  businessId: number

  @ApiProperty({ type: 'string', required: true })
  name: string

  @ApiProperty({ type: 'string', required: true })
  companyName: string

  @ApiProperty({ type: 'string', required: true })
  fantasyName: string

  @ApiProperty({ type: 'string', required: true })
  cnpjCpf: string

  @ApiProperty({ type: 'boolean', required: true })
  isActive: boolean

  static fromForm(entity: BusinessUnitDto): BusinessUnitDto {
    return new BusinessUnitDto({ ...entity })
  }

  static fromEntity(entity: BusinessUnitEntity): BusinessUnitDto {
    const address = { ...entity } as unknown as BusinessUnitDto
    return new BusinessUnitDto({ ...address })
  }

  toEntity(): BusinessUnitEntity {
    return { ...this } as unknown as BusinessUnitEntity
  }
}
