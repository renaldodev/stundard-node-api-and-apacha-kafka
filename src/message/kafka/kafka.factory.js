const { Kafka } = require("kafkajs");

module.exports = function kafkaInstance(option) {
  return new Kafka(option);
};
