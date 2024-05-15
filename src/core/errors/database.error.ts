import { CustomError } from '@/core/errors/protocols/custom.error'

export class DatabaseError implements CustomError {
  constructor(
    public readonly message: string,
    public readonly code: number = 500,
    public readonly error: string = 'Internal Server Error',
  ) {}
}
