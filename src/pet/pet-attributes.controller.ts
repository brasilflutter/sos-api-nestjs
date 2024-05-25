import { Controller, Get, HttpException, Param, Query } from '@nestjs/common'
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ColorDto } from '@/pet/dtos/attributes/color.dto'
import { SpecimenDto } from '@/pet/dtos/attributes/specimen.dto'
import { SizeDto } from '@/pet/dtos/attributes/size.dto'
import { BreedDto } from '@/pet/dtos/attributes/breed.dto'
import { Either } from '@/core/adapters/either'
import { PetAttributeService } from '@/pet/services/pet-attribute.service'

@ApiTags('Pet Attributes')
@Controller('pet-attributes')
export class PetAttributesController {
  constructor(private readonly petAttributeService: PetAttributeService) {}

  @ApiOkResponse({
    description: 'The list of breeds',
    type: BreedDto,
    isArray: true,
  })
  @ApiQuery({ name: 'name', required: false, type: String })
  @Get('/breeds')
  getBreeds(@Query('name') name?: string) {
    return this.petAttributeService.getBreeds(name)
  }

  @ApiOkResponse({
    description: 'The list of sizes',
    type: SizeDto,
    isArray: true,
  })
  @ApiQuery({ name: 'name', required: false, type: String })
  @Get('/sizes')
  getSizes(
    @Query('name') name?: string,
  ): Promise<Either<HttpException, SizeDto[]>> {
    return this.petAttributeService.getSizes(name)
  }

  @ApiOkResponse({
    description: 'The list of colors',
    type: ColorDto,
    isArray: true,
  })
  @ApiQuery({ name: 'name', required: false, type: String })
  @Get('/colors')
  getColors(
    @Query('name') name?: string,
  ): Promise<Either<HttpException, ColorDto[]>> {
    return this.petAttributeService.getColors(name)
  }

  @ApiOkResponse({
    description: 'The list of specimens',
    type: SpecimenDto,
    isArray: true,
  })
  @ApiQuery({ name: 'name', required: false, type: String })
  @Get('/specimens')
  getSpecimens(
    @Query('name') name?: string,
  ): Promise<Either<HttpException, SpecimenDto[]>> {
    return this.petAttributeService.getSpecimens(name)
  }
}
