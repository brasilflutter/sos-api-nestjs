import { Either, Left, Right } from '@/core/adapters/either'

describe('Either', () => {
  it('should be left', () => {
    const eitherLeft: Either<string, string> = new Left('test')
    expect(eitherLeft.isLeft()).toBeTruthy()
    expect(eitherLeft.isRight()).toBeFalsy()
  })

  it('should be right', () => {
    const eitherRight: Either<string, string> = new Right('test')
    expect(eitherRight.isLeft()).toBeFalsy()
    expect(eitherRight.isRight()).toBeTruthy()
  })
})
