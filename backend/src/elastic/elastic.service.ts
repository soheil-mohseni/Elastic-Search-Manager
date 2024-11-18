import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { GlobalService } from 'src/global/global.service';
import { CommandService } from 'src/global/command.service';
import { WriteConfig } from './interface/write-config.interface';
import { ErrorMessages } from 'src/share/common/constants/error.constant';

@Injectable()
export class ElasticService {
  private readonly logger = new Logger(ElasticService.name);
  constructor(
    @InjectQueue('searchQueue') private readonly searchQueue: Queue, // Inject Bull queue
    private readonly commandService: CommandService, // Inject Bull queue
  ) {}
  static bulkBody: any[] = [];
  static iterateCount = 500;
  static start_iterate = 0;
  static end_iterate = 1500;

  async writeConfig(body: WriteConfig) {
    if (body?.host && body?.username && body?.password) {
      const res = await GlobalService.configureElasticsearch(
        body.username,
        body.password,
        body.host,
      );
      console.log(res);

      return true;
    } else {
      throw new HttpException(ErrorMessages.BAD_CONFIG, HttpStatus.BAD_REQUEST);
    }
  }

  async writeDoc() {
    try {
      // Step 1: Initialize a ReadLine interface to read the file line by line

      // const fileStream = fs.createReadStream(
      //   path.resolve('src/dump/dorin.json'),
      // );
      // const lines = readline.createInterface({
      //   input: fileStream,
      //   crlfDelay: Infinity, // Recognize all instances of CR LF as a single line break
      // });

      const linesString: string = await this.commandService.runCutCommand(
        'path',
        ElasticService.start_iterate,
        ElasticService.end_iterate,
      );
      const lines = linesString
        .split('\n')
        .filter((line) => line.trim() !== ''); // Remove any empty lines

      let x = 0;

      // Step 2: Read the file line by line and parse each JSON object
      for await (const line of lines) {
        try {
          const doc = JSON.parse(line);
          x = x + 1;
          // console.log(x);
          // Modify a specific field (for example, change the 'status' field to 'active')
          const now = new Date();

          doc._source['@timestamp'] = now.toISOString();
          doc._source['time'] = now.getTime() - 10;

          // console.log(doc._source['@timestamp']);

          // Create the action metadata and document data
          ElasticService.bulkBody.push({
            index: { _index: doc._index },
          });
          ElasticService.bulkBody.push(doc._source); // Assuming the content to be indexed is with
          // console.log(ElasticService.bulkBody);
        } catch (error) {
          console.error('Error parsing line:', error);
        }
      }
      // Step 3: Split documents into three parts for parallel insertion
      const chunk1 = ElasticService.bulkBody.slice(0, 500);
      const chunk2 = ElasticService.bulkBody.slice(500, 1000);
      const chunk3 = ElasticService.bulkBody.slice(1000, 1500);

      // Step 4: Create promises for each chunk insertion
      const promise1 = this.insertDocuments(
        chunk1,
        `from ${ElasticService.start_iterate} to ${ElasticService.iterateCount + ElasticService.start_iterate}`,
      );
      const promise2 = this.insertDocuments(
        chunk2,
        `from ${ElasticService.iterateCount + ElasticService.start_iterate} to ${ElasticService.iterateCount * 2 + ElasticService.start_iterate}`,
      );
      const promise3 = this.insertDocuments(
        chunk3,
        `from ${ElasticService.iterateCount * 2 + ElasticService.start_iterate} to ${
          (ElasticService.iterateCount * 2 + ElasticService.start_iterate,
          ElasticService.iterateCount * 3 + ElasticService.start_iterate)
        }`,
      );

      console.log(ElasticService.bulkBody[0]);

      // Step 5: Execute all insertions in parallel
      await Promise.all([promise1, promise2, promise3]);

      console.log('All documents have been inserted in parallel.');
      ElasticService.bulkBody = [];
      ElasticService.start_iterate = ElasticService.end_iterate;
      ElasticService.end_iterate = ElasticService.end_iterate + 1500;
      console.log(ElasticService.start_iterate, ElasticService.end_iterate);

      // await this.searchQueue.add('writeDoc', {});
    } catch (error) {
      console.error('Error inserting documents:', JSON.stringify(error));
    }
  }

  private async insertDocuments(chunk: object[], size: string) {
    try {
      console.log(chunk.length);

      const response = await GlobalService.esClient.bulk({
        refresh: true, // Optional: use this if you want the changes to be immediately searchable
        body: chunk,
      });
    } catch (error) {
      console.error('Error in bulk insertion:', chunk);
    }
  }

  async searchWithPIT(index: string) {
    try {
      // Step 1: Open a Point-in-Time context (PIT)
      const pitResponse: any = await GlobalService.esClient.openPointInTime({
        index,
        keep_alive: '1m',
      });

      // Log the full response to inspect it
      if (!pitResponse || !pitResponse.id) {
        throw new Error('PIT ID is undefined. Unable to proceed.');
      }

      const pitId = pitResponse.id;

      // Step 2: Execute search query using PIT
      const searchResponse: any = await GlobalService.esClient.search({
        body: {
          track_total_hits: true,
          size: 3,
          version: true,
          pit: {
            id: pitId,
            keep_alive: '1m',
          },
          highlight: {
            pre_tags: ['@kibana-highlighted-field@'],
            post_tags: ['@/kibana-highlighted-field@'],
            fields: {
              '*': {},
            },
            fragment_size: 2147483647,
          },
        },
      });

      // Step 3: Close the PIT when done
      await GlobalService.esClient.closePointInTime({ body: { id: pitId } });
      this.logger.log('Search completed successfully.');

      return searchResponse;
    } catch (error) {
      this.logger.error('Error performing PIT query:', error.message);
      throw error;
    }
  }

  async addSearchJob(index: string) {
    // Add the job to the queue
    await this.searchQueue.add('elasticSearch', { index });
    this.logger.log(`Job added to the queue for index: ${index}`);
  }
}
