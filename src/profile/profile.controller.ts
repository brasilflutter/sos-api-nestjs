import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AddressDto } from '@/address/dtos/address.dto'

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor() {}
  @ApiOkResponse({
    description: 'The user records',
    type: AddressDto,
    isArray: true,
  })
  @Get('')
  async get(): Promise<any> {
    throw new Error('Not implemented')
  }
}
