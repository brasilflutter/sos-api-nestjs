import { AddressDto } from '@/core/dtos/address.dto'
import { BusinessDto } from '@/core/dtos/business.dto'
import { BusinessUnitDto } from '@/core/dtos/business.unit.dto'
import { ClientAttorneyDto } from '@/core/dtos/client.attorney.dto'
import { ClientEntity } from '@/core/entities/client.entity'
import { CivilStatusEnum } from '@/core/enums/civil.status.enum'
import { ClientScholarityEnum } from '@/core/enums/client.scholarity.enum'
import { GenderEnum } from '@/core/enums/gender.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ClientDto {
  constructor(partial?: Partial<ClientDto>) {
    if (partial) {
      if (partial?.phone) {
        partial.phone = partial.phone.replace(/\D/g, '')
      }
      if (partial?.birthDate) {
        partial.birthDate = new Date(partial.birthDate)
      }
      Object.assign(this, partial)
    }
  }

  @ApiProperty({ type: 'number', required: true })
  id?: number

  @ApiProperty({ type: AddressDto, required: false, isArray: true })
  addresses?: AddressDto[]

  @IsNumber()
  @ApiProperty({ type: 'number', required: true })
  businessId: number

  @ApiProperty({
    type: BusinessDto,
    required: false,
    readOnly: true,
  })
  business?: BusinessDto

  @IsNumber()
  @ApiProperty({ type: 'number', required: true })
  businessUnitId?: number

  @ApiProperty({ type: BusinessUnitDto, required: true, readOnly: true })
  businessUnit: BusinessUnitDto

  @IsString()
  @ApiProperty({ type: 'string', required: true })
  name: string

  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @ApiProperty({ type: 'string', required: true })
  email: string

  @ApiProperty({ type: 'string', required: false })
  phone?: string

  @IsNotEmpty({
    message: 'CPF/CNPJ is required',
  })
  @ApiProperty({ type: 'string', required: true })
  cpfCnpj: string

  @ApiProperty({ type: 'string', required: false })
  document?: string

  @ApiProperty({ type: Date, required: false })
  birthDate?: Date

  @ApiProperty({ enum: GenderEnum, required: false })
  gender?: GenderEnum

  @ApiProperty({ type: 'string', required: false })
  nacionality?: string

  @ApiProperty({ type: 'string', required: false })
  bornPlace?: string

  @ApiProperty({ type: 'string', required: false })
  occupation?: string

  @ApiProperty({ enum: CivilStatusEnum, required: false })
  civilStatus?: CivilStatusEnum

  @ApiProperty({ enum: ClientScholarityEnum, required: false })
  scholarity?: ClientScholarityEnum

  @ApiProperty({ type: 'number', required: false })
  income?: number

  @ApiProperty({ type: 'number', required: false })
  quantityDependents?: number

  @ApiProperty({ type: 'boolean', required: false, readOnly: true })
  hasAttorney?: boolean

  @ApiProperty({ type: ClientAttorneyDto, required: false, isArray: true })
  attorneys?: ClientAttorneyDto[]

  @ApiProperty({ type: 'boolean', required: true })
  isActive: boolean

  static fromForm(entity: Partial<ClientDto>): ClientDto {
    const clientDto = new ClientDto({
      ...entity,
    })

    if (entity?.business) {
      clientDto.business = BusinessDto.fromForm(entity.business)
    }

    if (entity?.businessUnit) {
      clientDto.businessUnit = BusinessUnitDto.fromForm(entity.businessUnit)
    }

    if (entity?.addresses) {
      clientDto.addresses = entity.addresses.map((address) =>
        AddressDto.fromForm(address),
      )
    }

    if (entity?.attorneys) {
      clientDto.attorneys = entity.attorneys.map((attorney) =>
        ClientAttorneyDto.fromForm(attorney),
      )
    }

    return clientDto
  }

  static fromEntity(entity: ClientEntity): ClientDto {
    const partialEntity = { ...entity } as unknown as Partial<ClientDto>
    delete partialEntity.addresses
    delete partialEntity.business
    delete partialEntity.businessUnit
    delete partialEntity.attorneys

    const clientDto = new ClientDto({ ...partialEntity })

    if (entity?.business) {
      clientDto.business = BusinessDto.fromEntity(entity.business)
    }

    if (entity?.businessUnit) {
      clientDto.businessUnit = BusinessUnitDto.fromEntity(entity.businessUnit)
    }

    if (entity?.addresses) {
      clientDto.addresses = entity.addresses.map((address) =>
        AddressDto.fromEntity(address),
      )
    }

    if (entity?.attorneys) {
      clientDto.attorneys = entity.attorneys.map((attorney) =>
        ClientAttorneyDto.fromEntity(attorney),
      )
    }

    return clientDto
  }

  public toEntity(): ClientEntity {
    const entity = { ...this } as unknown as Partial<ClientEntity>

    entity.income = this.income ? this.income : null
    entity.addresses = this.addresses?.map((address) => address.toEntity())
    entity.attorneys = this.attorneys?.map((attorney) => attorney.toEntity())
    entity.hasAttorney = this.attorneys?.length > 0

    const client = new ClientEntity({ ...entity })

    return client
  }

  public merge(data: Partial<ClientDto>): ClientDto {
    const newObject = { ...this, ...data }
    return new ClientDto(newObject)
  }
}
