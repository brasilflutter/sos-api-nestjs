import { Module } from '@nestjs/common'
import { AddressController } from '@/address/address.controller'

@Module({
  controllers: [AddressController],
  exports: [],
})
export class AddressModule {}
