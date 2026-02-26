/* eslint-disable @nx/enforce-module-boundaries */
// import { NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { PrismaClient } from '@metadb/client';

// import { AppModule } from './metadb.module';

// const prisma = new PrismaClient();

// import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
// import { AppModule } from './app.module';

// async function connectToDatabase() {
//   let attempts = 0;
//   while (attempts < 5) {
//     try {
//       await prisma.$connect();
//       console.log('Connected to the database');
//       return;
//     } catch (error) {
//       console.error('Could not connect to database, trying again...', error);
//       attempts++;
//       await new Promise((resolve) => setTimeout(resolve, 5000));
//     }
//   }
//   throw new Error('Could not connect to database after several attempts');
// }

// function swaggerSetup(app: INestApplication) {
//   const config = new DocumentBuilder()
//     .setTitle('Backend Assignment')
//     .setDescription(
//       'Assignment Backend developer uses Nestjs, Prisma & PostgreSql',
//     )
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);
// }

// async function bootstrap() {
//   await connectToDatabase();

//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     methods: 'GET',
//     maxAge: 3600,
//   });
//   app.useGlobalPipes(new ValidationPipe());
//   app.setGlobalPrefix('api');

//   // Swagger
//   swaggerSetup(app);

//   await app.listen(4000);
// }

// bootstrap().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
