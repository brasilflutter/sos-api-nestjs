import { Module } from '@nestjs/common'
import { UserController } from '@/user/user.controller'

@Module({
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
