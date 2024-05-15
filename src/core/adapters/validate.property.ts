import { Either, Left, Right } from '@/core/adapters/either'
import { CustomError } from '@/core/errors/protocols/custom.error'
import { ValidationPropertyError } from '@/core/errors/validation.property.error'
import { validate } from 'class-validator'

export const validateProperty = async (
  entity: any,
): Promise<Either<CustomError, boolean>> => {
  const errors = await validate(entity)
  if (errors.length) {
    return new Left(
      new ValidationPropertyError(
        errors
          .map((error) => Object.values(error.constraints).join(', '))
          .join(', '),
      ),
    )
  }
  return new Right(true)
}
