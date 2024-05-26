import { Module } from '@nestjs/common'
import { AddressEntity } from '@/core/entities/address.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressController } from '@/address/address.controller'
import { AddressService } from '@/address/address.service'

@Module({
  controllers: [AddressController],
  exports: [],
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [AddressService],
})
export class AddressModule {}
