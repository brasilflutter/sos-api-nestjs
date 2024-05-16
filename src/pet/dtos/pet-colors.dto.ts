import { PetColorsTypeEnum } from '@/core/enums/pet-colors-type.enum'

export type PetColorsDto = {
  id: number
  idColor: number
  type: PetColorsTypeEnum
}
