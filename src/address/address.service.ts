import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { AddressEntity } from '@/core/entities/address.entity'
import { AddressDto } from '@/address/dtos/address.dto'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async get(): Promise<AddressDto[]> {
    const address = await this.addressRepository.find()
    if (!address) {
      throw new Error('Address not found')
    }
    return address.map(AddressDto.fromEntity)
  }

  async getById(id: number): Promise<AddressDto> {
    const address = await this.addressRepository.findOne({
      where: { id },
    })
    if (!address) {
      throw new Error('Address not found')
    }
    return AddressDto.fromEntity(address)
  }

  async create(data: AddressDto): Promise<AddressDto> {
    const address = this.addressRepository.create(AddressDto.toEntity(data))
    const savedAddress = await this.addressRepository.save(address)
    return AddressDto.fromEntity(savedAddress)
  }

  async update(id: number, data: AddressDto): Promise<AddressDto> {
    const address = await this.addressRepository.findOne({ where: { id } })
    if (!address) {
      throw new Error('Address not found')
    }
    await this.addressRepository.update(id, AddressDto.toEntity(data))
    const updatedAddress = await this.addressRepository.findOne({
      where: { id },
    })
    return AddressDto.fromEntity(updatedAddress)
  }

  async delete(id: number): Promise<void> {
    const address = await this.addressRepository.findOne({ where: { id } })
    if (!address) {
      throw new Error('Address not found')
    }
    await this.addressRepository.delete(id)
  }
}
