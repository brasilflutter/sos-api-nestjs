import { Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor() {}

  @Get(':id')
  getById() {
    return 'This action returns an item'
  }

  @Put(':id')
  put() {
    return 'This action updates an item'
  }

  @Post()
  post() {
    return 'This action creates an item'
  }

  @Delete(':id')
  delete() {
    return 'This action removes an item'
  }
}
