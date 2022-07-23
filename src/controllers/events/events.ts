import express from "express";
const winston = require("../../config/winston");
const router = express.Router();
const { Kafka } = require("kafkajs");

// /**
//  * Produce a message to a topic
//  * The body is the message in JSON format.
//  * This will place a new message in the topic named topic_name.
//  * @param {string} topic_name
//  * Endpoint : POST http://localhost:<port>/events/{topic_name}
//  */

router.post("/", async (req, res) => {
  const messageBody = req.body;

  try {
    //TODO: move the logic into kafka producer file.
    // the client ID lets kafka know who's producing the messages
    const clientId = "mock-up-kafka-producer-client"; //TODO: move to .env variable
    // we can define the list of brokers in the cluster
    const brokers = ["localhost:9092"]; //TODO: move to .env variable
    // this is the topic to which we want to write messages
    const topic = "events"; //TODO: move to .env variable

    // initialize a new kafka client and initialize a producer from it
    const kafka = new Kafka({ clientId, brokers });
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [
        {
          value: messageBody,
        },
      ],
    });
    res.status(201).json(messageBody);
  } catch (err) {
    res.status(400).json(err);
    winston.error(err);
  }
});

// 2. GET /events/{topic_name}?timeout={ms}
// Gets the next message from topic_name.
// Will return 204 if there’s no message in the topic after the timeout has elapsed.
// If a timeout is not specified, a default of 10 seconds should be used.

export default router;
