import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import "./instrument";
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

import { SentryFilter } from './global/exceptionFilter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule,);
  app.enableCors({
    origin: [
      'http://localhost:5173',
    ],
    methods: ["GET", "POST"],
    credentials: true,
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  await app.listen(3000);

}
bootstrap();
