import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule } from '@/core/core.module'
import { UserModule } from '@/user/user.module'
import { AddressModule } from '@/address/address.module'
import { PetModule } from '@/pet/pet.module'
import { ShelterModule } from '@/shelter/shelter.module'
import { NotificationModule } from '@/notification/notification.module'
import { ContactModule } from '@/contact/contact.module'
import { FileUploadModule } from '@/file-upload/file-upload.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    CoreModule,
    UserModule,
    AddressModule,
    ContactModule,
    PetModule,
    ShelterModule,
    NotificationModule,
    FileUploadModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
