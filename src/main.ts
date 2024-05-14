import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = parseInt(process.env.PORT, 10) || 3000
  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .setTitle('Pets Api')
    .setDescription('The Api to help Localize Pets')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/`, 'Local environment')
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
    })
    .addTag('Auth', 'Endpoints for authentication')
    .addTag('Users', 'Endpoints for users')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(port)
}
bootstrap()
