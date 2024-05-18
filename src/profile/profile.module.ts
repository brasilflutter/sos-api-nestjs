import { forwardRef, Module } from '@nestjs/common'
import { ProfileController } from '@/profile/controllers/profile.controller'
import { ProfileService } from '@/profile/services/profile.service'
import { CoreModule } from '@/core/core.module'
import { AuthModule } from '@/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressEntity } from '@/core/entities/address.entity'
import { UserEntity } from '@/core/entities/user.entity'
import { ProfilePetsController } from '@/profile/controllers/profile-pets.controller'
import { ProfileAddressesController } from '@/profile/controllers/profile-addresses.controller'
import { ProfileSheltersController } from '@/profile/controllers/profile-shelters.controller'

@Module({
  controllers: [
    ProfileController,
    ProfilePetsController,
    ProfileAddressesController,
    ProfileSheltersController,
  ],
  exports: [],
  imports: [
    CoreModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([AddressEntity, UserEntity]),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
