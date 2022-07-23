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

export default router;
