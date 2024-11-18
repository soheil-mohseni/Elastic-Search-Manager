import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticModule } from './elastic/elastic.module';
import { ElasticService } from './elastic/elastic.service';
import { SentryModule } from "@sentry/nestjs/setup";


@Module({
  imports: [ElasticModule,    SentryModule.forRoot(),  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
