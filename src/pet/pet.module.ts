import { Module } from '@nestjs/common'
import { PetController } from '@/pet/pet.controller'
import { CoreModule } from '@/core/core.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PetEntity } from '@/core/entities/pets/pet.entity'
import { PetService } from '@/pet/services/pet.service'
import { ColorEntity } from '@/core/entities/pets/color.entity'
import { PetColorsEntity } from '@/core/entities/pets/pet-colors-entity'

@Module({
  controllers: [PetController],
  providers: [PetService],
  exports: [],
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([PetEntity, PetColorsEntity, ColorEntity]),
  ],
})
export class PetModule {}
