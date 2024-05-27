import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { UserDto } from '@/user/dtos/user.dto'
import { AuthGuard } from '@/core/guards/auth.guard'
import { getAuthorization } from '@/core/adapters/getAuthorization'
import { REQUEST } from '@nestjs/core'

@ApiSecurity('bearer')
@UseGuards(AuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  @Get()
  async get(): Promise<UserDto[]> {
    return this.userService.findAll()
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(): Promise<UserDto> {
    const authDto = getAuthorization(this.request)

    console.log(authDto.id)

    return await this.userService.findOne(authDto.id)
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOne(id)
  }

  @Put(':id')
  async put(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, userDto)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.delete(id)
  }
}
