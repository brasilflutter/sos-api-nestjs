import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AddressDto } from '@/address/dtos/address.dto'

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor() {}
  @ApiOkResponse({
    description: 'The address records',
    type: AddressDto,
    isArray: true,
  })
  @Get('')
  async get(): Promise<AddressDto> {
    throw new Error('Not implemented')
  }
  @ApiOkResponse({
    description: 'A single address record',
    type: AddressDto,
    isArray: true,
  })
  @Get(':id')
  async getById(id: string): Promise<AddressDto> {
    throw new Error('Not implemented')
  }
}
