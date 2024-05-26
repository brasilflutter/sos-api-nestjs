import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { AddressDto } from '@/address/dtos/address.dto'
import { ProfileService } from '@/profile/services/profile.service'
import { AuthGuard } from '@/core/guards/auth.guard'
import { REQUEST } from '@nestjs/core'
import { UserEntity } from '@/core/entities/user/user.entity'
import { Either } from '@/core/adapters/either'

@ApiSecurity('bearer')
@ApiTags('Profile')
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Get('')
  async get(): Promise<Either<HttpException, UserEntity>> {
    return this.profileService.get()
  }

  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Put('')
  async put(
    @Body() userEntity: Partial<UserEntity>,
  ): Promise<Either<HttpException, UserEntity>> {
    return this.profileService.update(userEntity)
  }

  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Delete('')
  async delete(): Promise<Either<HttpException, any>> {
    return this.profileService.delete()
  }
}
