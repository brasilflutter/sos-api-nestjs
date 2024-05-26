import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Either, Left, Right } from '@/core/adapters/either'
import { PetEntity } from '@/core/entities/pets/pet.entity'
import { PetDto } from '@/pet/dtos/pet.dto'
import { BreedEntity } from '@/core/entities/pets/breed.entity'
import { SizeEntity } from '@/core/entities/pets/size.entity'
import { ColorEntity } from '@/core/entities/pets/color.entity'
import { SpecimenEntity } from '@/core/entities/pets/specimen.entity'
import { SizeDto } from '@/pet/dtos/attributes/size.dto'
import { BreedDto } from '@/pet/dtos/attributes/breed.dto'
import { ColorDto } from '@/pet/dtos/attributes/color.dto'
import { SpecimenDto } from '@/pet/dtos/attributes/specimen.dto'

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
    @InjectRepository(ColorEntity)
    private readonly colorsRepository: Repository<ColorEntity>,
    @InjectRepository(SizeEntity)
    private readonly sizesRepository: Repository<SizeEntity>,
    @InjectRepository(SpecimenEntity)
    private readonly specimenRepository: Repository<SpecimenEntity>,
  ) {}

  async get(): Promise<Either<HttpException, PetEntity[]>> {
    const result = await this.petRepository.find()

    if (result) {
      return new Right(result)
    }

    return new Left(new HttpException('Pet not found', 404))
  }

  async getById(id: number): Promise<Either<HttpException, PetDto>> {
    const pet = await this.petRepository.findOne({
      where: {
        id,
      },
    })

    if (pet) {
      return new Right(PetDto.fromEntity(pet))
    }

    return new Left(new HttpException('Pet not found', 404))
  }

  async create(pet: PetDto): Promise<Either<HttpException, PetDto>> {
    const newPet = this.petRepository.create()
    newPet.description = pet.description
    newPet.idBreed = pet.idBreed
    newPet.idSize = pet.idSize
    newPet.idSpecimen = pet.idSpecimen
    newPet.lastSeenLocation = pet.lastSeenLocation
    newPet.status = pet.status

    const result = await this.petRepository.save(newPet)

    if (result) {
      return new Right(PetDto.fromEntity(result))
    }

    return new Left(new HttpException('Pet not created', 400))
  }

  async update(id: number, pet: Partial<PetDto>): Promise<PetDto> {
    await this.petRepository.update(id, pet)
    const newPet = await this.petRepository.findOneBy({ id })

    return PetDto.fromEntity(newPet)
  }

  async delete(id: number): Promise<void> {
    await this.petRepository.delete(id)
  }

  // get for each entity
  async getBreeds(name: string): Promise<Either<HttpException, BreedDto[]>> {
    const response = await this.breedRepository.find({
      where: {
        name: name,
      },
    })

    if (response) {
      return new Right(response.map((breed) => BreedDto.fromEntity(breed)))
    }

    return new Left(new HttpException('Breed not found', 404))
  }

  async getSizes(name: string): Promise<Either<HttpException, SizeDto[]>> {
    const result = await this.sizesRepository.find({
      where: {
        name: name,
      },
    })

    if (result) {
      return new Right(result.map((size) => SizeDto.fromEntity(size)))
    }

    return new Left(new HttpException('Size not found', 404))
  }

  async getColors(name: string): Promise<Either<HttpException, ColorDto[]>> {
    const result = await this.colorsRepository.find({
      where: {
        name: name,
      },
    })

    if (result) {
      return new Right(result.map((color) => ColorDto.fromEntity(color)))
    }

    return new Left(new HttpException('Color not found', 404))
  }

  async getSpecimens(
    name: string,
  ): Promise<Either<HttpException, SpecimenDto[]>> {
    const result = await this.specimenRepository.find({
      where: {
        name: name,
      },
    })

    if (result) {
      return new Right(
        result.map((specimen) => SpecimenDto.fromEntity(specimen)),
      )
    }

    return new Left(new HttpException('Specimen not found', 404))
  }
}
