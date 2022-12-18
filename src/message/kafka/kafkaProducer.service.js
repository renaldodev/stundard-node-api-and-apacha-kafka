const kProducer = Symbol("kProducer");
class KafkaProducerService {

  constructor(KafkaInstace) {
    this[kProducer] = KafkaInstace.producer();
  }

  async connect() {
    await this[kProducer].connect();
  }

  async send(topic, data) {
    if (!topic || !data) {
      throw new Error("There is data missing");
    }
    await this[kProducer].send({
      topic,
      messages: data,
    });
  }
  
  async disconnect() {
    await this[kProducer].disconnect();
  }
}

module.exports=KafkaProducerService
