import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@/core/guards/auth.guard'
import { ApiTags } from '@nestjs/swagger'

@UseGuards(AuthGuard)
@ApiTags('Profile Addresses')
@Controller('profile/addresses')
export class ProfileAddressesController {
  @Get()
  get() {
    return 'This action returns all items from the profile route'
  }

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
