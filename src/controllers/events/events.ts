import express from "express";
const winston = require("../../config/winston");
const router = express.Router();
import { kafkaProducer } from "../../services/kafka/producer";
import MD5 from "../../helpers/MD5";

// /**
//  * Produce a message to a topic
//  * The body is the message in JSON format.
//  * This will place a new message in the topic named topic_name.
//  * @param {string} topic_name
//  * Endpoint : POST http://localhost:<port>/events/{topic_name}
//  */

router.post("/:topic_name", async (req, res) => {
  const messageBody = req.body;

  try {
    const { topic_name } = req.params;
    await kafkaProducer(topic_name, MD5(topic_name), messageBody);
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
