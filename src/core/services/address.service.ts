import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Either, Left, Right } from '@/core/adapters/either'
import { REQUEST } from '@nestjs/core'
import { AddressEntity } from '@/core/entities/address.entity'
import { AddressDto } from '@/address/dtos/address.dto'
import { CustomError } from '@/core/errors/protocols/custom.error'
import { DatabaseError } from '@/core/errors/database.error'
import { getAuthorization } from '@/core/adapters/getAuthorization'
import { AuthError } from '@/core/errors/auth.error'

@Injectable()
export class AddressService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async save(address: AddressDto): Promise<Either<CustomError, AddressDto>> {
    if (address.id) {
      return this.update(address)
    }

    return this.create(address)
  }

  async create(address: AddressDto): Promise<Either<CustomError, AddressDto>> {
    const authDto = getAuthorization(this.request)
    if (!authDto) {
      return new Left(new AuthError('Unauthorized', 401))
    }
    const saved = await this.addressRepository.save({
      ...address,
    })

    if (!saved) {
      return new Left(new DatabaseError('Address not created', 500))
    }

    address.id = saved.id

    return new Right(address)
  }

  async update(address: AddressDto): Promise<Either<CustomError, AddressDto>> {
    const authDto = getAuthorization(this.request)
    if (!authDto) {
      return new Left(new AuthError('Unauthorized', 401))
    }
    const saved = await this.addressRepository.update(address.id, {
      ...address,
    })

    if (saved.affected === 0) {
      return new Left(new DatabaseError('Address not updated', 500))
    }

    return new Right(address)
  }

  async findOne(id: number): Promise<Either<CustomError, AddressDto | null>> {
    const authDto = getAuthorization(this.request)
    if (!authDto) {
      return new Left(new AuthError('Unauthorized', 401))
    }
    const address = await this.addressRepository.findOne({
      where: { id },
    })

    if (!address) {
      return new Right(null)
    }

    return new Right(AddressDto.fromEntity(address))
  }
}
