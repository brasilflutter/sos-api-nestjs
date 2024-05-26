import { forwardRef, Module } from '@nestjs/common'
import { ProfileController } from '@/profile/profile.controller'
import { ProfileService } from '@/profile/services/profile.service'
import { CoreModule } from '@/core/core.module'
import { AuthModule } from '@/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressEntity } from '@/core/entities/address.entity'
import { UserEntity } from '@/core/entities/user/user.entity'

@Module({
  controllers: [ProfileController],
  exports: [],
  imports: [
    CoreModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([AddressEntity, UserEntity]),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
