// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs");

// the client ID lets kafka know who's producing the messages
const clientId = "mock-up-kafka-consumer-client"; //TODO: move to .env variable
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]; //TODO: move to .env variable
// this is the topic to which we want to write messages
const topic = "events"; //TODO: move to .env variable

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers });

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive
const consumer = kafka.consumer({ groupId: clientId });

const consume = async () => {
  let data = [];
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: ({ message }) => {
      // here, we just log the message to the standard output
      // console.log(`received message: ${message.value}`)
      data.push(message);
    },
  });

  return data;
};

module.exports = consume;
