import { forwardRef, Module } from '@nestjs/common'
import { ProfileController } from '@/profile/controllers/profile.controller'
import { ProfileService } from '@/profile/services/profile.service'
import { CoreModule } from '@/core/core.module'
import { AuthModule } from '@/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressEntity } from '@/core/entities/address.entity'

@Module({
  controllers: [ProfileController],
  exports: [],
  imports: [
    CoreModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([AddressEntity]),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
