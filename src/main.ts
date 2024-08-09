import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { HttpExceptionFilter } from '@/config/http-exception.filter';
import { CustomLoggerService } from '@/logger/logger.service'; 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS if needed
  // app.enableCors(); 

  app.useGlobalFilters(new HttpExceptionFilter(new CustomLoggerService));
  initHelmet(app);
  initValidationPipes(app);
  initSwagger(app);
  await initApp(app);
}

async function initValidationPipes(app: any) {
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
}

async function initHelmet(app: any) {
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }));
}

async function initSwagger(app: any) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function initApp(app: any) {
  const port = process.env.PORT || 5001;
  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
