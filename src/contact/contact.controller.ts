import { Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Contacts')
@Controller('contact')
export class ContactController {
  constructor() {}

  @Get('')
  get() {
    return 'This action returns a list of items'
  }

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
