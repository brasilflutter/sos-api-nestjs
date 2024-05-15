import { HttpException, Injectable } from '@nestjs/common'
import { IsNull, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Either, Left, Right } from '@/core/adapters/either'
import { UserEntity } from '@/core/entities/user.entity'

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
}
