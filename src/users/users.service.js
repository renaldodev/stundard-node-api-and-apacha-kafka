class UserService {
  constructor(repository, kafkaProducer,kafkaConsumer) {
    this.repository = repository;
    this.kafkaProducer = kafkaProducer;
    this.kafkaConsumer=kafkaConsumer
  }

  async index() {
    await this.kafkaConsumer.connect()
    await this.kafkaConsumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await this.kafkaConsumer.run()
    await this.kafkaProducer.disconnect()
    return await this.repository.find();
  }
  async find(id) {
    return await this.repository.find(id);
  }
  async create(user) {
    const userId = await this.repository.create(user);
    await this.kafkaProducer.connect();
    await this.kafkaProducer.send({
      topic: "test-topic",
      messages: [{ value: "Hello KafkaJS user!" }],
    });

    await this.kafkaProducer.disconnect();
    return userId;
  }
}

module.exports = UserService;
