import { ResponseDto } from '@/core/dtos/response.dto'
import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

export const ApiBaseResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  options?: { isArray?: boolean; primitive?: string },
) => {
  if (options?.isArray) {
    return applyDecorators(
      ApiExtraModels(ResponseDto, dataDto),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(dataDto) },
                },
              },
            },
          ],
        },
      }),
    )
  }

  if (options?.primitive) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                data: {
                  type: options?.primitive,
                },
              },
            },
          ],
        },
      }),
    )
  }

  return applyDecorators(
    ApiExtraModels(ResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  )
}
