import { ApiProperty } from '@nestjs/swagger'

export class ResultTokenDto {
  @ApiProperty({ type: 'string', required: true })
  token: string
  @ApiProperty({ type: 'string', required: true })
  refreshToken: string
}
