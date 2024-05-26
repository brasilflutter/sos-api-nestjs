import { HttpException, Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Either, Left, Right } from '@/core/adapters/either'
import { ShelterEntity } from '@/core/entities/shelter/shelter.entity'
import { ShelterDto } from '@/shelter/dtos/shelter.dto'

@Injectable()
export class ShelterService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(ShelterEntity)
    private readonly shelterRepository: Repository<ShelterEntity>,
  ) {}

  async get(): Promise<Either<HttpException, ShelterDto[]>> {
    const shelters = await this.shelterRepository.find()

    if (!shelters) {
      return new Left(new HttpException('Shelters not found', 404))
    }

    return new Right(shelters.map((shelter) => ShelterDto.fromEntity(shelter)))
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
    return await this.shelterRepository.save(shelter.toEntity())
  }

  async update(id: number, item: Partial<ShelterDto>): Promise<ShelterDto> {
    await this.shelterRepository.update(id, item)

    const dto = new ShelterDto(item)

    await this.shelterRepository.update({ id }, dto.toEntity())

    const updated = await this.shelterRepository.findOne({ where: { id } })

    return ShelterDto.fromEntity(updated)
  }
}
