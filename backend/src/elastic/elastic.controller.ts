import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ElasticService } from './elastic.service';
import * as Sentry from '@sentry/node';
import { WriteConfig } from './interface/write-config.interface';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bull';

@Controller('elastic')
export class ElasticController {
  constructor(
    private readonly elasticService: ElasticService,
    @InjectQueue('searchQueue') private readonly queue: Queue,
  ) {}

  @Post('/set-config')
  async setConfig(@Body() body: WriteConfig) {
    console.log(body);

    return await this.elasticService.writeConfig(body);
  }

  @Delete('/remove-all-queue')
  async clearAllJobs(@Body() body: WriteConfig) {
    console.log(body);
    return await this.queue.obliterate({ force: true });
  }


  // @Cron('*/5 * * * * *') // Run every 5 seconds
  // async triggerElasticSearch() {`
  //     throw new Error("My first Sasddddddddddentry error!");
  //     await this.elasticService.writeDoc();

  // }
}
