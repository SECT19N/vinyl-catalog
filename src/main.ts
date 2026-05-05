import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Vinyl Catalog')
    .setDescription('API for managing vinyl catalog')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.use(
    '/docs',
    apiReference({
      theme: 'saturn',
      content: document,
    }),
  );

  await app.listen(process.env.PORT ?? 8492);
}

bootstrap();
