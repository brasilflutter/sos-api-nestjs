import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PetEntity } from '@/core/entities/pets/pet.entity'
import { PetService } from '@/pet/services/pet.service'
import { Either } from '@/core/adapters/either'
import { PetDto } from '@/pet/dtos/pet.dto'

@ApiTags('Pet')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOkResponse({
    description: 'The list of Pets',
    type: PetDto,
    isArray: true,
  })
  @Get('')
  get(): Promise<Either<HttpException, PetEntity[]>> {
    return this.petService.get()
  }

  @ApiOkResponse({
    description: 'Gets a Pet by Id',
    type: PetDto,
    isArray: true,
  })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.petService.getById(id)
  }

  @Put(':id')
  put(@Param('id') id: number, @Body() pet: PetDto) {
    return this.petService.update(id, pet)
  }

  @Post()
  post(@Body() pet: PetDto) {
    return this.petService.create(pet)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.petService.delete(id)
  }
}
