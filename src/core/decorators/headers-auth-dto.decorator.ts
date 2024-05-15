import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common'

export const HeadersAuthDto = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    if (!request.authDto) {
      throw new NotFoundException(
        'AuthDto not found in headers, use auth guards to solve this.',
      )
    }
    return request.authDto
  },
)
