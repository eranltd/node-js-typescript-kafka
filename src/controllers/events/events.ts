import express from "express";
const winston = require("../../config/winston");
const router = express.Router();

// /**
//  *
//  * Create and store new academy
//  * @param {string} academy.name
//  * @param {string} academy.ID
//  * @param {Array<RuleCondition>} academy.projects
//  * @param {string} academy.createdAt
//  * @param {string} academy.updatedAt
//  * Endpoint : POST http://localhost:<port>/academy
//  */

// router.post("/", async (req, res) => {
//   const { name, ID, projects } = req.body;

//   const academyInstance = new Academy({
//     name,
//     ID,
//     projects,
//   });

//   try {
//     //step 1 - save in db
//     const resp = await academyInstance.save();
//     res.status(201).json(resp);
//   } catch (err) {
//     res.status(400).json(err);
//     winston.error(err);
//   }
// });

// 1. POST /events/{topic_name}
// Produce a message to a topic
// The body is the message in JSON format.
// This will place a new message in the topic named topic_name.

// 2. GET /events/{topic_name}?timeout={ms}
// Gets the next message from topic_name.
// Will return 204 if there’s no message in the topic after the timeout has elapsed.
// If a timeout is not specified, a default of 10 seconds should be used.

export default router;
