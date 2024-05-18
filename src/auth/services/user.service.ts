import { HttpException, Injectable } from '@nestjs/common'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Either, Left, Right } from '@/core/adapters/either'
import { UserEntity } from '@/core/entities/user.entity'
import { SignUpDto } from '@/auth/dtos/sign-up.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<Either<HttpException, UserEntity>> {
    const found = await this.userRepository.findOne({
      where: {
        email,
        isActive: true,
        deletedAt: IsNull(),
      },
    })

    if (found) {
      return new Right(found)
    }

    return new Left(new HttpException('User not found', 404))
  }

  async createUser(
    params: SignUpDto,
  ): Promise<Either<HttpException, UserEntity>> {
    const user: Partial<UserEntity> = {
      email: params.email,
      password: params.password,
      isActive: true,
    }

    const createUser = await this.userRepository.save(user)

    if (createUser) {
      return new Right(createUser)
    }
    return new Left(new HttpException('User not created', 500))
  }

  async createDefaultUser(): Promise<Either<HttpException, UserEntity>> {
    const user = this.userRepository.create()

    if (user) {
      return new Right(await this.userRepository.save(user))
    }

    return new Left(new HttpException('User not created', 500))
  }
}
