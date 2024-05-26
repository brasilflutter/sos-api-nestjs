import { Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AddressDto } from '@/address/dtos/address.dto'
import { ShelterDto } from '@/shelter/dtos/shelter.dto'

@ApiTags('Shelter')
@Controller('shelter')
export class ShelterController {
  constructor() {}

  @ApiOkResponse({
    description: 'The user records',
    type: ShelterDto,
    isArray: true,
  })
  @Post('')
  async get(): Promise<ShelterDto> {
    throw new Error('Not implemented')
  }

  @ApiOkResponse({
    description: 'The user records',
    type: AddressDto,
    isArray: true,
  })
  @Post(':id')
  async getById(): Promise<ShelterDto> {
    throw new Error('Not implemented')
  }
}
