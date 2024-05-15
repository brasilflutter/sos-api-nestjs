import { ParamId } from '@/core/decorators/param-id.decorator'
import { getParamDecoratorFactory } from '@/core/__test__/common-functions'

describe('HeadersAuthDto', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    const paramId = ParamId
    expect(paramId).toBeDefined()
  })

  it('should be not exists id', () => {
    const factory = getParamDecoratorFactory(ParamId)
    const result = factory(null, {
      switchToHttp: () => ({
        getRequest: () => ({
          params: {},
        }),
      }),
    })

    expect(result).toBeNaN()
  })

  it('should be exists authDto', () => {
    const factory = getParamDecoratorFactory(ParamId)
    const result = factory(null, {
      switchToHttp: () => ({
        getRequest: () => ({
          params: {
            id: '1',
          },
        }),
      }),
    })
    expect(result).toEqual(1)
  })
})
