import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { SignInDto } from '@/auth/dtos/sign-in.dto'
import { ResultTokenDto } from '@/auth/dtos/result.token.dto'
import { SignUpDto } from '@/auth/dtos/sign-up.dto'
import { AuthGuard } from '@/core/guards/auth.guard'
import { AuthService } from '@/auth/services/auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sing-in')
  async signIn(@Body() signInDto: SignInDto): Promise<ResultTokenDto> {
    const either = await this.authService.signIn(signInDto)

    if (either.isLeft()) {
      throw either.value
    }

    return either.value
  }

  @Post('sing-in-anonymous')
  async signInAnonymous(): Promise<ResultTokenDto> {
    const either = await this.authService.signInAnonymous()

    if (either.isLeft()) {
      throw either.value
    }

    return either.value
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<ResultTokenDto> {
    const either = await this.authService.signUp(signUpDto)
    if (either.isLeft()) {
      throw either.value
    }

    return either.value
  }

  @ApiParam({ name: 'token', type: 'string' })
  @Get('refresh-token/:token')
  async refreshToken(@Param('token') token: string): Promise<ResultTokenDto> {
    const either = await this.authService.refreshToken(token)

    if (either.isLeft()) {
      throw either.value
    }

    return either.value
  }

  @Post('sign-out')
  @UseGuards(AuthGuard)
  async signOut(): Promise<any> {
    // return authDto
    throw new Error('Not implemented')
  }
}
