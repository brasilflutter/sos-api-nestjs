import { ApiProperty } from '@nestjs/swagger'

export class ResponseDto<T> {
  constructor(data: { data: T; status: boolean; message?: string }) {
    this.data = data.data
    this.status = data.status
    this.message = data.message
  }

  data: T
  @ApiProperty({ type: 'boolean', required: true })
  status: boolean

  @ApiProperty({ type: 'string', required: false })
  message?: string

  static ok<T>(data: { data: T; message?: string }) {
    return new ResponseDto<T>({
      data: data.data,
      status: true,
      message: data.message,
    })
  }

  static error<T>(data: { data: T; message?: string }) {
    return new ResponseDto<T>({
      data: data.data,
      status: false,
      message: data.message,
    })
  }
}
