import '@config/configuration';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('events').EventEmitter.defaultMaxListeners = 25;

async function bootstrap() {
  let logger = [];
  if (process.env.NODE_ENV === 'local') {
    logger = ['error', 'warn', 'log', 'debug', 'verbose'];
  } else if (process.env.NODE_ENV === 'development') {
    logger = ['error', 'warn', 'log'];
  } else {
    logger = ['error', 'warn'];
  }

  const transporter = {
    logger: logger,
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: process.env.PORT,
    },
  };

  const app = await NestFactory.createMicroservice(AppModule, transporter);
  await app.listen();
}

bootstrap();
