import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import { promisify } from 'util'
import { PresignedUrlDto } from '@/file-upload/dto/presigned-url.dto'

const writeFile = promisify(fs.writeFile)

@Injectable()
export class FileUploadService {
  private readonly uploadDir = path.resolve(__dirname, '..', '..', 'uploads')

  constructor(private readonly configService: ConfigService) {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir)
    }
  }

  async generatePresignedUrl(type: string): Promise<PresignedUrlDto> {
    const key = `${uuidv4()}`
    const baseUrl = this.configService.get<string>('BASE_URL')
    const uploadUrl = `${baseUrl}/file/upload/${key}.${type}`
    const url = `${baseUrl}/uploads/${key}`
    const dto = new PresignedUrlDto()

    dto.url = url
    dto.uploadUrl = uploadUrl
    dto.key = key

    return dto
  }

  async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    const filePath = path.join(this.uploadDir, key)
    await writeFile(filePath, file.buffer)
    return filePath
  }
}
