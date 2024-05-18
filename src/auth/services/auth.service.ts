import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EncrypterImpl } from '@/core/services/encripter.impl'
import { Either, Left, Right } from '@/core/adapters/either'
import { ResultTokenDto } from '@/auth/dtos/result.token.dto'
import { UserService } from '@/auth/services/user.service'
import { AuthDto } from '@/auth/dtos/auth.dto'
import { SignInDto } from '@/auth/dtos/sign-in.dto'
import { SignUpDto } from '@/auth/dtos/sign-up.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly encrypter: EncrypterImpl,
  ) {}

  tokenCreate(auth: AuthDto): ResultTokenDto {
    return {
      token: this.jwtService.sign(auth, {
        expiresIn: '1h',
        secret: String(process.env.JWT_SECRET),
      }),
      refreshToken: this.jwtService.sign(auth, {
        expiresIn: '7d',
        secret: String(process.env.JWT_SECRET),
      }),
    }
  }

  tokenIsValid(token: string): Either<UnauthorizedException, boolean> {
    try {
      this.jwtService.verify(token, {
        secret: String(process.env.JWT_SECRET),
      })
      return new Right(true)
    } catch (error) {
      return new Left(new UnauthorizedException('Invalid token'))
    }
  }

  tokenGetData(token: string): Either<UnauthorizedException, AuthDto> {
    const tokenIsValid = this.tokenIsValid(token)

    if (tokenIsValid.isLeft()) {
      return new Left(tokenIsValid.value)
    }

    const data = this.jwtService.verify(token, {
      secret: String(process.env.JWT_SECRET),
    })

    if (data) {
      return new Right({
        id: data.id,
        name: data.name,
        photo: data.photo,
        email: data.email,
      })
    }

    return new Left(new UnauthorizedException('Invalid token'))
  }

  /**
   * Login
   * Find user by email and compare password with the received in the request
   * If user and password are correct, return a jwt token
   * If user or password are incorrect, return Custom Error
   * @returns Promise<Either<HttpException, ResultTokenDto>>
   * @param signInDto
   */
  async signIn(
    signInDto: SignInDto,
  ): Promise<Either<HttpException, ResultTokenDto>> {
    const user = await this.userService.findByEmail(signInDto.email)
    if (user.isLeft()) {
      return new Left(new UnauthorizedException('User or password incorrect'))
    }
    if (user.value.isActive === false) {
      return new Left(new UnauthorizedException('User is not active'))
    }
    const compare = await this.encrypter.compare(
      signInDto.password,
      user.value.password,
    )

    if (!compare) {
      return new Left(new UnauthorizedException('User or password incorrect'))
    }

    const auth: AuthDto = {
      id: user.value.id,
      name: user.value.name,
      photo: 'photo',
      email: user.value.email,
    }

    return new Right(this.tokenCreate(auth))
  }

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<Either<HttpException, ResultTokenDto>> {
    const user = await this.userService.createUser(signUpDto)

    if (user.isLeft()) {
      return new Left(new InternalServerErrorException('User not created'))
    }
    const auth: AuthDto = {
      id: user.value.id,
      name: user.value.name,
      photo: 'photo',
      email: user.value.email,
    }
    return new Right(this.tokenCreate(auth))
  }

  async signInAnonymous(): Promise<Either<HttpException, ResultTokenDto>> {
    const user = await this.userService.createDefaultUser()
    if (user.isLeft()) {
      return new Left(new InternalServerErrorException('User not created'))
    }
    const auth: AuthDto = {
      id: user.value.id,
      name: user.value.name,
      photo: 'photo',
      email: user.value.email,
    }
    return new Right(this.tokenCreate(auth))
  }

  /**
   * Refresh Token
   * @param token string
   * @returns string | null - Jwt token or null
   */
  async refreshToken(
    token: string,
  ): Promise<Either<HttpException, ResultTokenDto>> {
    const data = this.tokenGetData(token)

    if (data.isLeft()) {
      return new Left(data.value)
    }

    return new Right(this.tokenCreate(data.value))
  }

  /**
   * User Has Permission
   * Check if user has permission to access the resource
   * @param data string
   * @returns boolean
   */

  async userHasPermission(
    data: string,
  ): Promise<Either<HttpException, boolean>> {
    return new Right(data.length > 0)
  }
}
