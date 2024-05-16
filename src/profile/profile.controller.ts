import { Controller, Delete, Get, Put, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { AddressDto } from '@/address/dtos/address.dto'
import { ProfileService } from '@/profile/services/profile.service'
import { AuthGuard } from '@/core/guards/auth.guard'

@ApiSecurity('bearer')
@ApiTags('Profile')
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Get('')
  async get(): Promise<any> {
    // this.profileService.get()
    return await this.profileService.get()
  }

  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Put('')
  async put(): Promise<any> {
    throw new Error('Not implemented')
  }

  @ApiOkResponse({
    description: 'The user profile',
    type: AddressDto,
    isArray: true,
  })
  @Delete('')
  async delete(): Promise<any> {
    throw new Error('Not implemented')
  }
}
