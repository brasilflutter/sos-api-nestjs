import { LoginDto } from '@/auth/dtos/login.dto'
import { Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AddressDto } from "@/address/dtos/address.dto";

@ApiTags('Shelter')
@Controller('shelter')
export class ShelterController {
  constructor() {}
  @ApiOkResponse({
    description: 'The user records',
    type: AddressDto,
    isArray: true,
  })
  @Post('')
  async get(): Promise<LoginDto> {
    throw new Error('Not implemented')
  }
}
