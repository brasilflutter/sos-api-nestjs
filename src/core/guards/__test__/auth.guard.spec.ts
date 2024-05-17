import { AuthService } from '@/auth/services/auth.service'
import { Left, Right } from '@/core/adapters/either'
import { AuthGuard } from '@/core/guards/auth.guard'

describe('AuthGuard', () => {
  let authServiceMock: AuthService = jest.fn() as any

  beforeEach(() => {
    authServiceMock = jest.fn() as any
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    const guard = AuthGuard
    expect(guard).toBeDefined()
  })

  it('should be canActivate', async () => {
    authServiceMock.tokenIsValid = jest.fn().mockReturnValue(true)
    authServiceMock.tokenGetData = jest.fn().mockReturnValue({ id: 1 })
    authServiceMock.userHasPermission = jest
      .fn()
      .mockReturnValue(new Right(true))
    const guard = new AuthGuard(authServiceMock)
    const baseContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: '',
          },
          route: {
            path: '/test/test',
          },
        }),
      }),
    } as any

    expect(await guard.canActivate(baseContext)).toBeTruthy()
  })

  it('should not be canActivate', async () => {
    authServiceMock.tokenIsValid = jest.fn().mockReturnValue(false)
    const guard = new AuthGuard(authServiceMock)
    const baseContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'bad token',
          },
          route: {
            path: '/test/test',
          },
        }),
      }),
    } as any

    expect(await guard.canActivate(baseContext)).toBeFalsy()
  })

  it('should not be canActivate because auth is null', async () => {
    authServiceMock.tokenIsValid = jest.fn().mockReturnValue(false)
    const guard = new AuthGuard(authServiceMock)
    const baseContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: null,
          },
        }),
      }),
    } as any

    expect(await guard.canActivate(baseContext)).toBeFalsy()
  })

  it('should not be canActivate', async () => {
    authServiceMock.tokenIsValid = jest.fn().mockReturnValue(true)
    authServiceMock.tokenGetData = jest.fn().mockReturnValue({ id: 1 })
    authServiceMock.userHasPermission = jest
      .fn()
      .mockReturnValue(new Left(false))
    const guard = new AuthGuard(authServiceMock)
    const baseContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: '',
          },
          route: {
            path: '/test/test',
          },
        }),
      }),
    } as any

    expect(await guard.canActivate(baseContext)).toBeFalsy()
  })

  it('should not be canActivate without router', async () => {
    authServiceMock.tokenIsValid = jest.fn().mockReturnValue(true)
    authServiceMock.tokenGetData = jest.fn().mockReturnValue({ id: 1 })
    authServiceMock.userHasPermission = jest
      .fn()
      .mockReturnValue(new Left(false))
    const guard = new AuthGuard(authServiceMock)
    const baseContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: '',
          },
          route: {
            path: null,
          },
        }),
      }),
    } as any

    expect(await guard.canActivate(baseContext)).toBeFalsy()
  })
})
