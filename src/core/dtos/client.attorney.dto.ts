import { ClientAttorneyEntity } from '@/core/entities/client-attorney.entity'
import { ApiProperty } from '@nestjs/swagger'

export class ClientAttorneyDto {
  constructor(partial?: Partial<ClientAttorneyDto>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @ApiProperty({ type: 'number', required: false })
  id?: number
  @ApiProperty({ type: 'number', required: false })
  clientId: number
  @ApiProperty({ type: 'string', required: true })
  name: string
  @ApiProperty({ type: 'string', required: true })
  email: string
  @ApiProperty({ type: 'string', required: false })
  phone?: string
  @ApiProperty({ type: 'string', required: true })
  cpfCnpj: string
  @ApiProperty({ type: 'string', required: false })
  document?: string

  static fromForm(entity: ClientAttorneyDto): ClientAttorneyDto {
    return new ClientAttorneyDto({ ...entity })
  }

  static fromEntity(entity: ClientAttorneyEntity): ClientAttorneyDto {
    const attorney = { ...entity } as unknown as ClientAttorneyDto
    return new ClientAttorneyDto({ ...attorney })
  }

  toEntity(): ClientAttorneyEntity {
    const attorneyDto = { ...this } as unknown as ClientAttorneyEntity
    return new ClientAttorneyEntity({ ...attorneyDto })
  }
}
