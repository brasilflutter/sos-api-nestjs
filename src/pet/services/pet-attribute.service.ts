import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { Either, Left, Right } from '@/core/adapters/either'
import { BreedEntity } from '@/core/entities/pets/breed.entity'
import { SizeEntity } from '@/core/entities/pets/size.entity'
import { ColorEntity } from '@/core/entities/pets/color.entity'
import { SpecimenEntity } from '@/core/entities/pets/specimen.entity'
import { SizeDto } from '@/pet/dtos/attributes/size.dto'
import { BreedDto } from '@/pet/dtos/attributes/breed.dto'
import { ColorDto } from '@/pet/dtos/attributes/color.dto'
import { SpecimenDto } from '@/pet/dtos/attributes/specimen.dto'

@Injectable()
export class PetAttributeService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
    @InjectRepository(ColorEntity)
    private readonly colorsRepository: Repository<ColorEntity>,
    @InjectRepository(SizeEntity)
    private readonly sizesRepository: Repository<SizeEntity>,
    @InjectRepository(SpecimenEntity)
    private readonly specimenRepository: Repository<SpecimenEntity>,
  ) {}

  async getBreeds(name?: string): Promise<Either<HttpException, BreedDto[]>> {
    const response = await this.breedRepository.find({
      where: name ? { name: ILike(`%${name}%`) } : {},
    })

    if (response && response.length > 0) {
      return new Right(response.map((breed) => BreedDto.fromEntity(breed)))
    }

    return new Left(new HttpException('Breed not found', 404))
  }

  async getSizes(name?: string): Promise<Either<HttpException, SizeDto[]>> {
    console.log('name', name)

    const result = await this.sizesRepository.find({
      where: name ? { name: ILike(`%${name}%`) } : {},
    })

    if (result && result.length > 0) {
      return new Right(result.map((size) => SizeDto.fromEntity(size)))
    }

    return new Left(new HttpException('Size not found', 404))
  }

  async getColors(name: string): Promise<Either<HttpException, ColorDto[]>> {
    const result = await this.colorsRepository.find({
      where: name ? { name: ILike(`%${name}%`) } : {},
    })

    if (result && result.length > 0) {
      return new Right(result.map((color) => ColorDto.fromEntity(color)))
    }

    return new Left(new HttpException('Color not found', 404))
  }

  async getSpecimens(
    name?: string,
  ): Promise<Either<HttpException, SpecimenDto[]>> {
    const result = await this.specimenRepository.find({
      where: name ? { name: ILike(`%${name}%`) } : {},
    })

    if (result && result.length > 0) {
      return new Right(
        result.map((specimen) => SpecimenDto.fromEntity(specimen)),
      )
    }

    return new Left(new HttpException('Specimen not found', 404))
  }
}
