import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ElasticService } from './elastic.service';
import { ElasticController } from './elastic.controller';
import { SearchProcessor } from 'src/bullmq/bullmq';
import { CommandService } from 'src/share/global/command.service';
import { APP_FILTER } from "@nestjs/core";
import { SentryGlobalFilter } from "@sentry/nestjs/setup";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'searchQueue',
    }),
  ],
  controllers: [ElasticController],
  providers: [ElasticService, SearchProcessor,CommandService,    {
    provide: APP_FILTER,
    useClass: SentryGlobalFilter,
  }],
  exports:[ElasticService]
})
export class ElasticModule {}
