import { AuthService } from '@/auth/services/auth.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    const token = (authorization ?? '').split(' ')[1]

    if (!this.authService.tokenIsValid(token)) {
      return false
    }

    request.authDto = this.authService.tokenGetData(token)
    return true
  }
}
