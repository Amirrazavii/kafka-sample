import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopic, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable({})
export class ConsumerService implements OnApplicationShutdown{
    constructor(
        private readonly configModule:ConfigService
    ){
  
        
    }
    private readonly kafka =new Kafka({
        brokers:[this.configModule.get('KAFKA_URL')]
    })
    
    
    private readonly consumers:Consumer[]=[];
    async consume(topic :ConsumerSubscribeTopic,config:ConsumerRunConfig){
        
        const consumer=this.kafka.consumer({groupId:'nestjs-kafka'})
        await consumer.connect()
        await consumer.subscribe(topic)
        await consumer.run(config)
        this.consumers.push(consumer)
        
    }
    async onApplicationShutdown() {
        for(const consumer of this.consumers){
            await consumer.disconnect()
        }
     
    }
}