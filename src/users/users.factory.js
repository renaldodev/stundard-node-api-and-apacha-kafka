const { resolve } = require("path");
const UserRepository = require("./users.repository");
const UserService = require("./users.service");
const kafkaInstance = require("../message/kafka/kafka.factory");
const KafkaProducer = require("../message/kafka/kafkaProducer.service");
const KafkaConsumer = require("../message/kafka/kafkaConsumer.service");

class UserFactory {
  static createInstance() {
    const userRepository = new UserRepository(
      resolve("src", "users", "data.json")
    );
    const kafkaIns = kafkaInstance({
      brokers: ["relieved-pigeon-11663-us1-kafka.upstash.io:9092"],
      sasl: {
        mechanism: "scram-sha-256",
        username:
          "cmVsaWV2ZWQtcGlnZW9uLTExNjYzJITr80RDFEcMA5TFzhzn5MAVOC3V3y46ZWE",
        password:
          "3wfpiCiqDrXYhCPz-8ZeYqPkIRI4UPS3kWnmddAVhD2RfQHm0Fe6M0y1rNUmmQ6tvLLt_Q==",
      },
      ssl: true,
    });
    const userService = new UserService(
      userRepository,
      new KafkaProducer(kafkaIns),
      new KafkaConsumer(kafkaIns,{ groupId: 'test-group' })
    );
    return userService;
  }
}

module.exports = UserFactory;
