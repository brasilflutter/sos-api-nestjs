import { AddressEntity } from '@/core/entities/address.entity'
import { EncrypterImpl } from '@/core/services/encripter.impl'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  providers: [EncrypterImpl],
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  exports: [EncrypterImpl],
})
export class CoreModule {}
