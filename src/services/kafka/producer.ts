import { geo_location_event } from "../../models/GEOLocationEvent";
// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs");

import MD5 from "../../helpers/MD5";
// the client ID lets kafka know who's producing the messages
const clientId = "mock-up-kafka-producer-client"; //TODO: move to .env variable
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]; //TODO: move to .env variable
// this is the topic to which we want to write messages
const topic = "events"; //TODO: move to .env variable

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();

const getRandomFriction = () => Math.floor(Math.random() * 10 ** 6) / 10 ** 6;

// we define an async function that writes a new message each second
const produce = async () => {
  console.log(
    "Starting to produce dummy kafka messages every 1000 millisecond's"
  );
  console.log(`Topic : [${topic}]`);

  await producer.connect();

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
        topic,
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
      console.error("could not write message " + err);
    }
  }, 1000);
};

module.exports = produce;
