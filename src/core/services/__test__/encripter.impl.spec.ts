import { EncrypterImpl } from '@/core/services/encripter.impl'
import { Encrypter } from '@/core/services/protocols/encripter'

describe('EncripterImpl', () => {
  let encripter: Encrypter

  beforeEach(() => {
    encripter = new EncrypterImpl()
  })

  it('should be defined', () => {
    expect(encripter).toBeDefined()
  })

  it('should be encript', async () => {
    const encripted = await encripter.encrypt('test')
    expect(encripted).toBeDefined()
  })

  it('should be compare', async () => {
    const encripted = await encripter.encrypt('test')
    const compared = await encripter.compare('test', encripted)
    expect(compared).toBeTruthy()
  })

  it('should be compare fail', async () => {
    const encripted = await encripter.encrypt('test')
    const compared = await encripter.compare('test2', encripted)
    expect(compared).toBeFalsy()
  })
})
