import { Encrypter } from '@/core/services/protocols/encripter'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class EncrypterImpl implements Encrypter {
  async encrypt(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    value = `${value}${process.env.BCRYPT_TOKEN}`
    return await bcrypt.hash(value, salt)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    value = `${value}${process.env.BCRYPT_TOKEN}`
    return await bcrypt.compare(value, hash)
  }
}
