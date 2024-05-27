import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'
import { UserEntity } from '@/core/entities/user/user.entity'

export class UserDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
  })
  @IsOptional()
  id: number

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'The photo URL of the user',
  })
  @IsString()
  photo: string

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user is active',
    readOnly: true,
  })
  @IsBoolean()
  isActive: boolean

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The creation date of the user',
    readOnly: true,
  })
  @IsOptional()
  createdAt: Date

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The last update date of the user',
    readOnly: true,
  })
  @IsOptional()
  updatedAt: Date

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The deletion date of the user',
    readOnly: true,
  })
  @IsOptional()
  deletedAt?: Date | null

  static fromEntity(entity: UserEntity): UserDto {
    const dto = new UserDto()
    dto.id = entity.id
    dto.email = entity.email
    dto.name = entity.name
    dto.photo = entity.photo
    dto.isActive = entity.isActive
    dto.createdAt = entity.createdAt
    dto.updatedAt = entity.updatedAt
    dto.deletedAt = entity.deletedAt
    return dto
  }

  static toEntity(dto: UserDto): UserEntity {
    const entity = new UserEntity()
    entity.id = dto.id
    entity.email = dto.email
    entity.name = dto.name
    entity.photo = dto.photo
    entity.isActive = dto.isActive
    entity.createdAt = dto.createdAt
    entity.updatedAt = dto.updatedAt
    entity.deletedAt = dto.deletedAt
    return entity
  }
}
