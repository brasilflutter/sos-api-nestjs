import { HttpException, Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/core/entities/user/user.entity'
import { Either, Left, Right } from '@/core/adapters/either'
import { getAuthorization } from '@/core/adapters/getAuthorization'

@Injectable()
export class ProfileService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(): Promise<Either<HttpException, UserEntity>> {
    const authDto = getAuthorization(this.request)

    const user = await this.userRepository.findOne({
      where: { id: authDto.id },
    })

    if (!user) {
      return new Left(new HttpException('User not found', 404))
    }

    return new Right(user)
  }

  async update(
    data: Partial<UserEntity>,
  ): Promise<Either<HttpException, UserEntity>> {
    const authDto = getAuthorization(this.request)

    const user = await this.userRepository.findOne({
      where: { id: authDto.id },
    })

    if (!user) {
      return new Left(new HttpException('User not found', 404))
    }

    await this.userRepository.update(user.id, data)

    return new Right({ ...user, ...data })
  }

  async delete(): Promise<Either<HttpException, any>> {
    const authDto = getAuthorization(this.request)

    const user = await this.userRepository.findOne({
      where: { id: authDto.id },
    })

    if (!user) {
      return new Left(new HttpException('User not found', 404))
    }

    await this.userRepository.delete(user.id)

    return new Right({})
  }
}
