const kConsumer = Symbol("KConsumer");

class KafkaConsumerService {
  constructor(kafkaInstance, options) {
    this[kConsumer] = kafkaInstance.consumer(options);
  }

  async connect() {
    await this[kConsumer].connect();
  }

  async subscribe(options) {
    await this[kConsumer].subscribe(options);
  }

  async run(){
  await this[kConsumer].run({
      eachMessages:({topic,partition,message})=>{
        console.log({
          value:message.value.toString()
        })
      }
    })
  }

  async disconnect() {
    await this[kConsumer].disconnect();
  }
}

module.exports=KafkaConsumerService
