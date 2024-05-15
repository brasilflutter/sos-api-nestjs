import { LoginDto } from '@/auth/dtos/login.dto'
import type { AuthDto } from '@/core/dtos/auth.dto'
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MoreThanOrEqual } from 'typeorm'
import { EncrypterImpl } from '@/core/services/encripter.impl'
import { Either, Left, Right } from '@/core/adapters/either'
import { ResultTokenDto } from '@/auth/dtos/result.token.dto'

@Injectable()
export class AuthService {
  constructor(
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

  tokenIsValid(token: string): boolean {
    try {
      const data = this.jwtService.verify(token, {
        secret: String(process.env.JWT_SECRET),
      })
      return !!data.id
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }

  tokenGetData(token: string): AuthDto {
    try {
      this.tokenIsValid(token)
      const data = this.jwtService.verify(token, {
        secret: String(process.env.JWT_SECRET),
      })
      return {
        id: data.id,
        businessId: data.businessId,
        businessUnitId: data.businessUnitId,
        name: data.name,
        photo: data.photo,
        email: data.email,
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }

  async registerAccessError(email: string): Promise<void> {
    await this.accessErrorRepository.save({
      email,
      createdAt: new Date(),
    })
  }

  async itsAllowedToRetryLogin(email: string): Promise<boolean> {
    const date = new Date()
    date.setMinutes(date.getMinutes() - 30)

    const result = await this.accessErrorRepository.count({
      where: {
        email,
        createdAt: MoreThanOrEqual(date),
      },
    })

    return result < 3
  }

  async accessLogRegister(userId: number) {
    await this.accessLogRepository.save({
      userId,
      ipAddress: '',
      userAgent: '',
      createdAt: new Date(),
    })
  }

  /**
   * Login
   * Find user by email and compare password with the received in the request
   * If user and password are correct, return a jwt token
   * If user or password are incorrect, return Custom Error
   * @param authDto LoginDto
   * @returns Promise<Either<HttpException, ResultTokenDto>>
   */
  async login(
    loginDto: LoginDto,
  ): Promise<Either<HttpException, ResultTokenDto>> {
    const allowRetry = await this.itsAllowedToRetryLogin(loginDto.email)
    if (!allowRetry) {
      return new Left(new UnauthorizedException('Too many attempts'))
    }
    const user = await this.userService.findByEmail(loginDto.email)
    if (user.isLeft()) {
      await this.registerAccessError(loginDto.email)
      return new Left(new UnauthorizedException('User or password incorrect'))
    }
    if (user.value.isActive === false) {
      await this.registerAccessError(loginDto.email)
      return new Left(new UnauthorizedException('User is not active'))
    }
    const compare = await this.encrypter.compare(
      loginDto.password,
      user.value.password,
    )

    if (!compare) {
      await this.registerAccessError(loginDto.email)
      return new Left(new UnauthorizedException('User or password incorrect'))
    }

    await this.accessLogRegister(user.value.id)

    const auth: AuthDto = {
      id: user.value.id,
      businessId: user.value.businessId,
      businessUnitId: user.value.businessUnitId,
      name: user.value.name,
      photo: 'photo',
      email: user.value.email,
    }

    return new Right(this.tokenCreate(auth))
  }

  async test(): Promise<string> {
    const user = await this.userService.findOne(1)
    return user.value.name
  }

  /**
   * Refresh Token
   * @param token string
   * @returns string | null - Jwt token or null
   */
  async refreshToken(
    token: string,
  ): Promise<Either<HttpException, ResultTokenDto>> {
    try {
      const data = this.tokenGetData(token)
      return new Right(this.tokenCreate(data))
    } catch (error) {
      return new Left(new UnauthorizedException('Invalid token'))
    }
  }

  /**
   * User Has Permission
   * Check if user has permission to access the resource
   * @param data UserHasPermission
   * @returns boolean
   */

  async userHasPermission(
    data: UserHasPermission,
  ): Promise<Either<HttpException, boolean>> {
    const routine = await this.routineRepository.findOne({
      where: {
        resource: data.resource,
        action: data.action,
        method: data.method,
        isActive: true,
      },
    })

    if (!routine) {
      // return new Left(new UnauthorizedException('Routine not found'))
      return new Right(true)
    }

    const result = await this.permissionRepository.query(
      `SELECT count(userHasProfile.id) as count
      FROM userHasProfile
      INNER JOIN permission ON userHasProfile.profileId = permission.profileId
      WHERE userHasProfile.userId = ${data.user.id}
      AND permission.routineId = ${routine.id}
      AND permission.isActive = 1
      `,
    )

    return new Right(parseInt(result[0].count) > 0)
  }
}
