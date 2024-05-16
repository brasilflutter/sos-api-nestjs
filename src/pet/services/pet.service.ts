import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { AddressEntity } from '@/core/entities/address.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PetService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async get(): Promise<any> {
    return this.addressRepository.find()
  }
}
