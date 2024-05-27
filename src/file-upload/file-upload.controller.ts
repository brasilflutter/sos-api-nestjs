import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { FileUploadService } from '@/file-upload/file-upload.service'
import { PresignedUrlDto } from '@/file-upload/dto/presigned-url.dto'

@ApiTags('File Upload')
@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiOkResponse({ type: PresignedUrlDto })
  @ApiQuery({ name: 'type', required: true, type: String })
  @Get('presigned-url')
  async getPresignedUrl(@Query('type') type: string): Promise<PresignedUrlDto> {
    return this.fileUploadService.generatePresignedUrl(type)
  }

  @Post('upload/:key')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @Param('key') key: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ filePath: string }> {
    const filePath = await this.fileUploadService.uploadFile(file, key)
    return { filePath }
  }
}
