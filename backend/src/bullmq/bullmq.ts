import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { ElasticService } from 'src/modules/elastic/elastic.service';

@Processor('searchQueue') // This is the queue name
export class SearchProcessor {
  private readonly logger = new Logger(SearchProcessor.name);

  constructor(private readonly elasticService: ElasticService) {}

  @Process('elasticSearch') // This is the job name
  async handleSearchJob(job: Job) {
    this.logger.log(`Processing job for index: ${job.data.index}`);

    try {
      const result = await this.elasticService.searchWithPIT(job.data.index);
      this.logger.log('Search result:', result);
    } catch (error) {
      this.logger.error('Error processing search job:', error.message);
    }
  }



  @Process('write_document') // This is the job name
  async WriteDocument(job: Job) {
    this.logger.log(`Processing job for writing documnts`);

    try {
      const result = await this.elasticService.writeDoc();
      this.logger.log('Search result:', result);
    } catch (error) {
      this.logger.error('Error processing writing documnts:', error.message);
    }
  }
}
