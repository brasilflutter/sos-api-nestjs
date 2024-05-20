import { HttpException, Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Either, Left, Right } from '@/core/adapters/either'
import { ShelterEntity } from '@/core/entities/shelter/shelter.entity'
import { ShelterDto } from '@/shelter/dtos/shelter.dto'
import { AddressEntity } from '@/core/entities/address.entity'

@Injectable()
export class ShelterService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(ShelterEntity)
    private readonly shelterRepository: Repository<ShelterEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async get(): Promise<any> {
    return this.shelterRepository.find()
  }

  async getById(id: number): Promise<Either<HttpException, ShelterEntity>> {
    const pet = await this.shelterRepository.findOne({
      where: {
        id,
      },
    })

    if (pet) {
      return new Right(pet)
    }

    return new Left(new HttpException('Shelter not found', 404))
  }

  async create(shelter: ShelterDto): Promise<ShelterEntity> {
    return await this.shelterRepository.save(shelter)
  }

  async update(
    id: number,
    pet: Partial<ShelterEntity>,
  ): Promise<ShelterEntity> {
    await this.shelterRepository.update(id, pet)
    return this.shelterRepository.findOneBy({ id })
  }

  async delete(id: number): Promise<void> {
    await this.shelterRepository.delete(id)
  }
}
