import { ApiProperty } from '@nestjs/swagger'

export class PresignedUrlDto {
  @ApiProperty({
    description: 'Expected file type extension (e.g., jpg, png)',
    example: 'jpg',
    readOnly: true,
  })
  filetype: string

  @ApiProperty({
    type: 'string',
    readOnly: true,
    example: 'https://bucket.s3.amazonaws.com/key',
  })
  url: string

  @ApiProperty({
    type: 'string',
    readOnly: true,
    example: 'https://bucket.s3.amazonaws.com/key',
  })
  uploadUrl: string

  @ApiProperty({
    type: 'string',
    readOnly: true,
    example: 'c635b7ef-121a-4fae-b1f0-bdfe88bd5756',
  })
  key: string
}
