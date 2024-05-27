import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/core/entities/user/user.entity'
import { UserDto } from '@/user/dtos/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find()
    return users.map((user) => UserDto.fromEntity(user))
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return UserDto.fromEntity(user)
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const userEntity = UserDto.toEntity(userDto)
    const newUser = await this.userRepository.save(userEntity)
    return UserDto.fromEntity(newUser)
  }

  async update(id: number, userDto: UserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    const updatedUser = await this.userRepository.save({ ...user, ...userDto })
    return UserDto.fromEntity(updatedUser)
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  }
}
