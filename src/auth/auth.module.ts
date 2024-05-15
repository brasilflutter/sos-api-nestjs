import { AuthController } from '@/auth/auth.controller'
import { Module } from '@nestjs/common'

@Module({
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}