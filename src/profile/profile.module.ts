import { Module } from '@nestjs/common'

@Module({
  controllers: [ProfileModule],
  exports: [],
})
export class ProfileModule {}
