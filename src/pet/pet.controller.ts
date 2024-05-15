import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AddressDto } from "@/address/dtos/address.dto";

@ApiTags('Pet')
@Controller('pet')
export class PetController {
  constructor() {}
  @ApiOkResponse({
    description: 'The user records',
    type: AddressDto,
    isArray: true,
  })
  @Get('')
  async get(): Promise<any> {
    throw new Error('Not implemented')
  }
  @ApiOkResponse({
    description: 'The user records',
    type: AddressDto,
    isArray: true,
  })
  @Get(':id')
  async getById(id: string): Promise<any> {
    throw new Error('Not implemented')
  }
}
