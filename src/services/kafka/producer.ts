import { geo_location_event } from "../../models/GEOLocationEvent";
const winston = require("../../config/winston");
const { Kafka, Partitioners } = require("kafkajs");

import MD5 from "../../helpers/MD5";
// the client ID lets kafka know who's producing the messages
const clientId = process.env.KAFKA_CLIENT_ID;

// we can define the list of brokers in the cluster
const brokers = [process.env.KAFKA_DEFAULT_BROKER];
// this is the topic to which we want to write messages
const defaultMockupTopic = process.env.KAFKA_MOCKUP_TOPIC;
// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const getRandomFriction = () => Math.floor(Math.random() * 10 ** 6) / 10 ** 6;
const NUM_OF_SECONDS = 1000 * 5;

// we define an async function that writes a new message each second
export const kafkaMockProducer = async () => {
  console.log(
    `Starting to produce dummy kafka messages every ${NUM_OF_SECONDS} millisecond's`
  );
  console.log(
    `Producting kafka mock-up messages to Kafka Topic : [${defaultMockupTopic}]`
  ); //TODO: move to winston

  try {
    await producer.connect();
  } catch (e) {
    winston.error("could not connect to kafka cluster");
    winston.error(e.message);
  }

  // after the produce has connected, we start an interval timer
  setInterval(async () => {
    try {
      // send a message to the configured topic
      const dummyLocationObject: geo_location_event = {
        uuid: MD5(new Date().getTime()),
        utc_timestamp: new Date().getTime(),
        lat: 31 + getRandomFriction(),
        lng: 35 + getRandomFriction(),
        authorization_token: MD5("some dummy string"),
      };

      await producer.send({
        topic: defaultMockupTopic,
        messages: [
          {
            key: dummyLocationObject.uuid,
            value: JSON.stringify(dummyLocationObject),
          },
        ],
      });

      // if the message is written successfully, log it
      console.log("produced to kafka: ", JSON.stringify(dummyLocationObject));
    } catch (err) {
      winston.error("could not write message");
      console.error(err.message);
    }
  }, NUM_OF_SECONDS);
};

export const kafkaProducer = async (topicName, key, value) => {
  await producer.connect();
  try {
    await producer.send({
      topicName,
      messages: [
        {
          key: key,
          value: value instanceof String ? value : JSON.stringify(value),
        },
      ],
    });
  } catch (err) {
    console.error("could not write message " + err);
  }
};
