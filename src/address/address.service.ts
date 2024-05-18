import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { AddressEntity } from '@/core/entities/address.entity'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly userRepository: Repository<AddressEntity>,
  ) {}

  async getById(id: number): Promise<AddressEntity> {
    return this.userRepository.findOne({
      where: { id },
    })
  }

  async create(data: Partial<AddressEntity>): Promise<AddressEntity> {
    return this.userRepository.save(data)
  }

  async update(
    id: number,
    data: Partial<AddressEntity>,
  ): Promise<AddressEntity> {
    await this.userRepository.update(id, data)
    return this.userRepository.findOne({
      where: { id },
    })
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id)
  }
}
