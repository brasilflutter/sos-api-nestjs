import { Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor() {}

  @Get(':id')
  getById() {
    return 'This action returns an item from the profile route'
  }

  @Put(':id')
  put() {
    return 'This action updates an item from the profile route'
  }

  @Post()
  post() {
    return 'This action creates an item from the profile route'
  }

  @Delete(':id')
  delete() {
    return 'This action removes an item from the profile route'
  }
}
