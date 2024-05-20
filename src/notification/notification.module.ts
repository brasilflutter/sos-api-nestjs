import { Module } from '@nestjs/common'
import { NotificationController } from '@/notification/notification.controller'

@Module({
  controllers: [NotificationController],
  exports: [],
})
export class NotificationModule {}
