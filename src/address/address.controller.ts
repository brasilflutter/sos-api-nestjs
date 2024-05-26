import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AddressService } from './address.service'
import { AddressDto } from '@/address/dtos/address.dto'

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('')
  async get(): Promise<AddressDto[]> {
    return this.addressService.get()
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<AddressDto> {
    return this.addressService.getById(id)
  }

  @Post()
  async post(@Body() data: AddressDto): Promise<AddressDto> {
    return this.addressService.create(data)
  }

  @Put(':id')
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AddressDto,
  ): Promise<AddressDto> {
    return this.addressService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.addressService.delete(id)
  }
}
