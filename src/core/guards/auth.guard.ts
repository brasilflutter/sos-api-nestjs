import { AuthService } from '@/auth/auth.service'
import { UserHasPermission } from '@/auth/types'
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

    const authDto = this.authService.tokenGetData(token)

    request.authDto = authDto

    const paths = (request.route.path ?? '').split('/')

    const resource = paths[1] ?? ''
    let action = paths[2] ?? ''

    if (action.includes(':')) {
      action = ''
    }

    const hasPermission = {
      user: authDto,
      resource,
      action,
      method: request.method,
    } as UserHasPermission

    const result = await this.authService.userHasPermission(hasPermission)

    if (result.isLeft()) {
      return false
    }

    return result.value
  }
}
