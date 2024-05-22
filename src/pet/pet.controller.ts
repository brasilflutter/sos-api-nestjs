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
import { ColorDto } from '@/pet/dtos/attributes/color.dto'
import { SpecimenDto } from '@/pet/dtos/attributes/specimen.dto'
import { SizeDto } from '@/pet/dtos/attributes/size.dto'
import { BreedDto } from '@/pet/dtos/attributes/breed.dto'
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
    return 'This action updates an item'
  }

  @Post()
  post(@Body() pet: PetDto) {
    return 'This action creates an item'
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return 'This action removes an item'
  }

  @ApiOkResponse({
    description: 'The list of breeds',
    type: BreedDto,
    isArray: true,
  })
  @Get('/breeds')
  getBreeds(@Param('name') name: string) {
    return this.petService.getBreeds(name)
  }

  @ApiOkResponse({
    description: 'The list of sizes',
    type: SizeDto,
    isArray: true,
  })
  @Get('/sizes')
  getSizes(
    @Param('name') name: string,
  ): Promise<Either<HttpException, SizeDto[]>> {
    return this.petService.getSizes(name)
  }

  @ApiOkResponse({
    description: 'The list of colors',
    type: ColorDto,
    isArray: true,
  })
  @Get('/colors')
  getColors(
    @Param('name') name: string,
  ): Promise<Either<HttpException, ColorDto[]>> {
    return this.petService.getColors(name)
  }

  @ApiOkResponse({
    description: 'The list of specimens',
    type: SpecimenDto,
    isArray: true,
  })
  @Get('/specimens')
  getSpecimens(
    @Param('name') name: string,
  ): Promise<Either<HttpException, SpecimenDto[]>> {
    return this.petService.getSpecimens(name)
  }
}
