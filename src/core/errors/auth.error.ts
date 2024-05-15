import { CustomError } from '@/core/errors/protocols/custom.error'

export class AuthError implements CustomError {
  constructor(
    public readonly message: string,
    public readonly code: number = 401,
    public readonly error: string = 'Unauthorized',
  ) {}
}
