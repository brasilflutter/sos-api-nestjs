import { AuthService } from '@/auth/services/auth.service'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    if (!authorization) {
      throw new UnauthorizedException('Authorization header not found')
    }

    const token = authorization.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('Token not found')
    }

    const isValid = this.authService.tokenIsValid(token)
    if (!isValid) {
      throw new UnauthorizedException('Invalid token')
    }

    request.authDto = this.authService.tokenGetData(token)
    return true
  }
}
