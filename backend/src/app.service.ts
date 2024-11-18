import { Injectable } from '@nestjs/common';
import { ElasticService } from './modules/elastic/elastic.service';

@Injectable()
export class AppService {
  constructor(
    private readonly elasticService: ElasticService,
  ) {}
  async onApplicationBootstrap() {
  
}

}