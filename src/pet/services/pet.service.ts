import { HttpException, Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Either, Left, Right } from '@/core/adapters/either'
import { PetEntity } from '@/core/entities/pets/pet.entity'
import { PetDto } from '@/pet/dtos/pet.dto'

@Injectable()
export class PetService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
    // private readonly petColorsRepository: Repository<PetColorsEntity>,
    // private readonly petRepository: Repository<>,
  ) {}

  async get(): Promise<any> {
    return this.petRepository.find()
  }

  async getById(id: number): Promise<Either<HttpException, PetEntity>> {
    const pet = await this.petRepository.findOne({
      where: {
        id,
      },
    })

    if (pet) {
      return new Right(pet)
    }

    return new Left(new HttpException('Pet not found', 404))
  }

  async create(pet: PetDto): Promise<PetEntity> {
    const newPet = this.petRepository.create()
    newPet.description = pet.description
    newPet.idBreed = pet.idBreed
    newPet.idSize = pet.idSize
    newPet.idSpeciment = pet.idSpecimen
    newPet.lastSeenLocation = pet.lastSeenLocation
    newPet.status = pet.status

    // get

    // newPet.colors = pet.colors

    return await this.petRepository.save(newPet)
  }

  async update(id: number, pet: Partial<PetEntity>): Promise<PetEntity> {
    await this.petRepository.update(id, pet)
    return this.petRepository.findOneBy({ id })
  }

  async delete(id: number): Promise<void> {
    await this.petRepository.delete(id)
  }
}
