import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {Kafka, Producer, ProducerRecord} from 'kafkajs'

@Injectable()
export class ProducerService implements OnModuleInit,OnApplicationShutdown{
    constructor(
        private readonly configModule:ConfigService
    ){
  
        
    }
    private readonly kafka =new Kafka({
        brokers:[this.configModule.get('KAFKA_URL')]
    })
    
    private readonly producer:Producer=this.kafka.producer()
    
    async  onModuleInit() {
        await this.producer.connect()
    }
    
    async produce(record :ProducerRecord){
        await this.producer.send(record)
        
    }
    async onApplicationShutdown(signal?: string) {
        await this.producer.disconnect()
    }
    


}