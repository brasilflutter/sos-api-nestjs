import { LoginDto } from '@/auth/dtos/login.dto'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  async login(@Body() authDto: LoginDto): Promise<LoginDto> {
    return authDto
  }

  @Get('me')
  async me(): Promise<string> {
    return 'Hello World'
  }
}
