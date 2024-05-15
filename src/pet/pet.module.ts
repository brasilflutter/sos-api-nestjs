import { Module } from '@nestjs/common'
import { PetController } from '@/pet/pet.controller'

@Module({
  controllers: [PetController],
  exports: [],
})
export class PetModule {}
