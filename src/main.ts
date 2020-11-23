import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from '../environment';

async function nestjsApplication() {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // getting application environment
  const env = process.env.NODE_ENV;
  // getting application config based on environment
  const envConfig = environment[env];
  // setting port value
  const port = envConfig.port || 4000;

  await app.listen(port, () =>
    console.log(
      `Nest Js with sequelize postgreSQL App listening on port ${port} !`,
    ),
  );
}
nestjsApplication();
