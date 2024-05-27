import { forwardRef, Module } from '@nestjs/common'
import { UserController } from '@/user/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/core/entities/user/user.entity'
import { UserService } from '@/user/user.service'
import { AuthModule } from '@/auth/auth.module'

@Module({
  controllers: [UserController],
  exports: [],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
})
export class UserModule {}
