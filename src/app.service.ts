import { Injectable, Query } from '@nestjs/common';
import {ProducerService} from 'src/kafka/producer.service'
import { QueryDto } from './kafka/query.dto';

@Injectable()
export class AppService {
  constructor(private readonly producerService:ProducerService){}
  getHello(query): string {
    console.log(query);
    
    this.producerService.produce({
      topic:"test",
      messages:[{
        value:JSON.stringify(query)
      }]

    })
    return 'Hello World!';
  }
}
