import { Injectable } from '@nestjs/common';
import {ProducerService} from 'src/kafka/producer.service'

@Injectable()
export class AppService {
  constructor(private readonly producerService:ProducerService){}
  getHello(): string {
    this.producerService.produce({
      topic:"test",
      messages:[{
        value:'hello'
      }]

    })
    return 'Hello World!';
  }
}
