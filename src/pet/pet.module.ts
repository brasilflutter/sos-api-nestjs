import { Module } from '@nestjs/common'
import { PetController } from '@/pet/pet.controller'
import { CoreModule } from '@/core/core.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PetEntity } from '@/core/entities/pets/pet.entity'
import { PetService } from '@/pet/services/pet.service'
import { ColorEntity } from '@/core/entities/pets/color.entity'
import { PetColorsEntity } from '@/core/entities/pets/pet-colors-entity'
import { SizeEntity } from '@/core/entities/pets/size.entity'
import { SpecimenEntity } from '@/core/entities/pets/specimen.entity'
import { BreedEntity } from '@/core/entities/pets/breed.entity'
import { PetAttributesController } from '@/pet/pet-attributes.controller'
import { PetAttributeService } from '@/pet/services/pet-attribute.service'

@Module({
  controllers: [PetController, PetAttributesController],
  providers: [PetService, PetAttributeService],
  exports: [],
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([
      PetEntity,
      PetColorsEntity,
      ColorEntity,
      SizeEntity,
      SpecimenEntity,
      BreedEntity,
    ]),
  ],
})
export class PetModule {}
