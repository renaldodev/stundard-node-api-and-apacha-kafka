curl -i \
  -X POST \
  -d '{"value":"10","valuex":"120"}' \
  localhost:3333

curl -i \
  -X GET
localhost:3333

curl "https://relieved-pigeon-11663-us1-rest-kafka.upstash.io/consume/GROUP_NAME/GROUP_INSTANCE_NAME/test-topic" \
  -H "Kafka-Auto-Offset-Reset: earliest" \
  -u "cmVsaWV2ZWQtcGlnZW9uLTExNjYzJITr80RDFEcMA5TFzhzn5MAVOC3V3y46ZWE:3wfpiCiqDrXYhCPz-8ZeYqPkIRI4UPS3kWnmddAVhD2RfQHm0Fe6M0y1rNUmmQ6tvLLt_Q=="
