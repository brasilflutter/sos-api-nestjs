import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { LoginDto } from "./dtos/login.dto"

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
