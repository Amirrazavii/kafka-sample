import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./kafka/consumer.service";

@Injectable()
export class TestConsumer implements OnModuleInit{
    constructor(
        private readonly consumerService:ConsumerService
    ){}
    async onModuleInit() {
       await  this.consumerService.consume(
            { topic:"test"},{
            eachMessage: async ({topic,partition,message})=>{
                console.log({
                    topic:topic,
                    partition: partition,
                    value:message.value.toString()
                    // value:message.value

                });
                
            }
        })
       
    }
  

}