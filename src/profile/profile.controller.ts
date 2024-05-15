import { Controller, Delete, Get, Put } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AddressDto } from '@/address/dtos/address.dto'

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor() {}
  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Get('')
  async get(): Promise<any> {
    throw new Error('Not implemented')
  }
  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Put('')
  async put(): Promise<any> {
    throw new Error('Not implemented')
  }
  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Delete('')
  async delete(): Promise<any> {
    throw new Error('Not implemented')
  }
}
