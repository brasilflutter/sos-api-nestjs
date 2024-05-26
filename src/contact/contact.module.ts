import { Module } from '@nestjs/common'
import { ContactController } from '@/contact/contact.controller'

@Module({
  controllers: [ContactController],
  exports: [],
})
export class ContactModule {}
