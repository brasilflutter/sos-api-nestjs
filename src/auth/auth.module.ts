import { AuthController } from '@/auth/auth.controller'
import { Module } from '@nestjs/common'
import { AuthService } from '@/auth/services/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { CoreModule } from '@/core/core.module'
import { UserService } from '@/auth/services/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/core/entities/user.entity'

const JwtModuleInstance = JwtModule.register({
  secret: String(process.env.JWT_SECRET),
})

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService, UserService],
  imports: [
    JwtModuleInstance,
    CoreModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class AuthModule {}
