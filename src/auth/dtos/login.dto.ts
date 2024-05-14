import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsStrongPassword } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    example: 'marcusmazzon@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'Marcus@1#2',
    required: true,
    description:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be at least 8 characters long',
  })
  @IsStrongPassword()
  password?: string
}
