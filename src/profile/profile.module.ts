import { Module } from '@nestjs/common'
import { ProfileController } from '@/profile/profile.controller'

@Module({
  controllers: [ProfileController],
  exports: [],
})
export class ProfileModule {}
