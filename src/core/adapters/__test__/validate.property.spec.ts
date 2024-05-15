import { validateProperty } from '@/core/adapters/validate.property'
import { ValidationPropertyError } from '@/core/errors/validation.property.error'
import { faker } from '@faker-js/faker'
import { IsEmail, MinLength } from 'class-validator'

class customEntity {
  @MinLength(3)
  name: string

  @MinLength(3)
  @IsEmail()
  email: string
}

describe('ValidateProperty', () => {
  it('Entity is correctly', async () => {
    const entity = new customEntity()
    entity.name = faker.person.firstName()
    entity.email = faker.internet.email()

    const result = await validateProperty(entity)
    expect(result.isRight()).toBeTruthy()
  })

  it('Entity is incorrect', async () => {
    const entity = new customEntity()
    entity.name = faker.person.firstName()
    entity.email = 'email'

    const result = await validateProperty(entity)
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ValidationPropertyError)
  })
})
