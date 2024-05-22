import { ApiProperty } from '@nestjs/swagger'
import { IsUrl } from 'class-validator'

export class PetImageDto {
  @ApiProperty({ type: 'string', example: '' })
  @IsUrl()
  url: string

  @ApiProperty({
    type: 'number',
    example: 0,
    description: 'Index of the image, case 0 is the main image',
  })
  index: number
}
