import { Module } from '@nestjs/common'
import { ShelterController } from '@/shelter/shelter.controller'

@Module({
  controllers: [ShelterController],
  exports: [],
})
export class ShelterModule {}
