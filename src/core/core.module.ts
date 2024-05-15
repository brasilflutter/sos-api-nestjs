import { AddressEntity } from '@/core/entities/address.entity'
import { AddressService } from '@/core/services/address.service'
import { EncrypterImpl } from '@/core/services/encripter.impl'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  providers: [EncrypterImpl, AddressService],
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  exports: [EncrypterImpl, AddressService],
})
export class CoreModule {}
