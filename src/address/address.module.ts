import { Module } from '@nestjs/common'
import { AddressEntity } from '@/core/entities/address.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [],
  exports: [],
  imports: [TypeOrmModule.forFeature([AddressEntity])],
})
export class AddressModule {}
