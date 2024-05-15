import { HeadersAuthDto } from '@/core/decorators/headers-auth-dto.decorator'
import { getParamDecoratorFactory } from '@/core/__test__/common-functions'

describe('HeadersAuthDto', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    const headerAuthDto = HeadersAuthDto
    expect(headerAuthDto).toBeDefined()
  })

  it('should be not exists authDto', () => {
    try {
      const factory = getParamDecoratorFactory(HeadersAuthDto)
      factory(null, {
        switchToHttp: () => ({ getRequest: () => ({}) }),
      })
    } catch (error) {
      expect(error.message).toBe(
        'AuthDto not found in headers, use auth guards to solve this.',
      )
    }
  })

  it('should be exists authDto', () => {
    const factory = getParamDecoratorFactory(HeadersAuthDto)
    const authDto = { id: 1, email: 'test' }
    const result = factory(null, {
      switchToHttp: () => ({ getRequest: () => ({ authDto }) }),
    })
    expect(result).toEqual(authDto)
  })
})
