import { AuthService } from '@/auth/services/auth.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true

    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    const token = (authorization ?? '').split(' ')[1]

    if (!this.authService.tokenIsValid(token)) {
      return false
    }

    const authDto = this.authService.tokenGetData(token)

    request.authDto = authDto

    const paths = (request.route.path ?? '').split('/')

    // const resource = paths[1] ?? ''
    let action = paths[2] ?? ''

    if (action.includes(':')) {
      action = ''
    }

    // @todo: Implementar verificação de permissão
    const result = await this.authService.userHasPermission('need_change')

    if (result.isLeft()) {
      return false
    }

    // return result.value
  }
}
