import { CustomError } from '@/core/errors/protocols/custom.error'

export class ValidationPropertyError implements CustomError {
  constructor(
    public readonly message: string,
    public readonly code: number = 400,
    public readonly error: string = 'Bad Request',
  ) {}
}
