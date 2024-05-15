import { AddressDto } from '@/address/dtos/address.dto'
import { AddressEntity } from '@/core/entities/address.entity'
import { AuthError } from '@/core/errors/auth.error'
import { DatabaseError } from '@/core/errors/database.error'
import { AddressService } from '@/core/services/address.service'
import { REQUEST } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

describe('AddressService', () => {
  let service: AddressService
  let addressRepository: Repository<AddressEntity>
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(REQUEST)
      .useValue({
        authDto: {
          businessId: 1,
          businessUnitId: 1,
        },
      })
      .compile()

    service = module.get<AddressService>(AddressService)
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an address', async () => {
    const addressResult = {
      id: 1,
      address: 'Rua teste',
      number: '123',
      neighborhood: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      country: 'País teste',
      zipCode: '12345678',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as AddressEntity
    const address = new AddressDto({
      id: 1,
      address: 'Rua teste',
      number: '123',
      neighborhood: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      zipCode: '12345678',
    })

    jest.spyOn(addressRepository, 'save').mockResolvedValue(addressResult)
    const result = await service.create(address)
    expect(result.isRight()).toBeTruthy()
    expect((result.value as AddressDto).id).toBe(1)
  })

  it('should create an address with error', async () => {
    const address = new AddressDto({
      id: 1,
      address: 'Rua teste',
      number: '123',
      neighborhood: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      zipCode: '12345678',
    })

    jest.spyOn(addressRepository, 'save').mockResolvedValue(null)
    const result = await service.create(address)
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DatabaseError)
  })

  it('should not logged user trying access address create', async () => {
    module = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<AddressService>(AddressService)

    const address = new AddressDto({
      id: 1,
      address: 'Rua teste',
      number: '123',
      neighborhood: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      zipCode: '12345678',
    })
    const result = await service.save(address)
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(AuthError)
  })

  it('should not logged user trying access address update', async () => {
    module = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<AddressService>(AddressService)

    const address = new AddressDto({
      id: 1,
      address: 'Rua teste',
      number: '123',
      neighborhood: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      zipCode: '12345678',
    })
    const result = await service.save(address)
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(AuthError)
  })

  it('should update an address', async () => {
    const addressResult = {
      raw: [],
      affected: 1,
      generatedMaps: [],
    } as UpdateResult
    const address = new AddressDto({
      id: 1,
      address: 'Rua teste',
      number: '123',
      neighborhood: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      zipCode: '12345678',
    })

    jest.spyOn(addressRepository, 'update').mockResolvedValue(addressResult)
    const result = await service.update(address)
    expect(result.isRight()).toBeTruthy()
    expect((result.value as AddressDto).id).toBe(1)
  })

  it('should update an address', async () => {
    const addressResult = {
      raw: [],
      affected: 0,
      generatedMaps: [],
    } as UpdateResult
    const address = new AddressDto({
      id: 1,
      address: 'Rua teste',
      number: '123',
      neighborhood: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      zipCode: '12345678',
    })

    jest.spyOn(addressRepository, 'update').mockResolvedValue(addressResult)
    const result = await service.update(address)
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(DatabaseError)
  })

  it('should not logged user trying access address finding', async () => {
    module = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<AddressService>(AddressService)

    const result = await service.findOne(1)
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(AuthError)
  })

  it('should find an address', async () => {
    const addressResult = {
      id: 1,
      address: 'Rua teste',
      number: '123',
      neighborhood: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      country: 'País teste',
      zipCode: '12345678',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as AddressEntity

    jest.spyOn(addressRepository, 'findOne').mockResolvedValue(addressResult)
    const result = await service.findOne(1)
    expect(result.isRight()).toBeTruthy()
    expect((result.value as AddressDto).id).toBe(1)
  })

  it('should not find an address', async () => {
    jest.spyOn(addressRepository, 'findOne').mockResolvedValue(null)
    const result = await service.findOne(1)
    expect(result.isRight()).toBeTruthy()
    expect(result.value).toBeNull()
  })
})
