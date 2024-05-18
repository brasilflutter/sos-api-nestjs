import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PetEntity } from '@/core/entities/pets/pet.entity'
import { PetService } from '@/pet/services/pet.service'

@ApiTags('Pet')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOkResponse({
    description: 'The user profile',
    type: PetEntity,
    isArray: true,
  })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.petService.getById(id)
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
