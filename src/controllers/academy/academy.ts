import express from "express";
const winston = require("../../config/winston");
const Academy = require("../../models/Academy.model");
const router = express.Router();
const util = require('util') /**use to implement console.dir in CLI */

/**
 *
 * Create and store new academy
 * @param {string} academy.name
 * @param {string} academy.ID
 * @param {Array<RuleCondition>} academy.projects
 * @param {string} academy.createdAt
 * @param {string} academy.updatedAt
 * Endpoint : POST http://localhost:<port>/academy
 */

router.post("/", async (req, res) => {
  const {
    name,
    ID,
    projects
  } = req.body;


  const academyInstance = new Academy({
    name,
    ID,
    projects
  });

  try{
  //step 1 - save in db
    const resp = await academyInstance.save();
    res.status(201).json(resp);

  }
  catch(err){
        res.status(400).json(err);
        winston.error(err);
   }
 
});

/**
 * Delete a specific academy
 * @param {objectId} id - workiz rule id
 * @return {Notifications}
 * Endpoint : DELETE http://localhost:<port>/academy/<id>
 */
router.delete("/delete/:id", async (req, res) => {
  try{
    const academyID = req.params.id;
    const resp = await Academy.findById(academyID);
    resp.Delete();
    resp.save()

       res.status(200).json(resp);
    }
  
  catch(err){
     res.status(400).json(err.message);
     winston.error(err);
}
});


/**
 * Enable a specific academy item
 * @param {objectId} id - workiz academy id
 * Endpoint : GET http://localhost:<port>/academy/restore/<id>
 */
router.put("/restore/:id", async (req, res) => {
  try{
    const academyID = req.params.id;
    const resp = await Academy.findById(academyID);
    resp.UnDelete();
    resp.save();
    winston.info(`UnDeleted Academy ID: [${academyID}]`)
    res.status(200).json(resp);
  }
  catch(err){
     res.status(400).json(err);
     winston.error(err);

}
});

/**
 * Get a specific rule
 * @param {objectId} id - workiz rule id
 * @return {Notifications}
 * Endpoint : GET http://localhost:<port>/rules/<id>
 */
router.get("/:id", async (req, res) => {
  try{
    const academyID = req.params.id;
    const resp = await Academy.findById(academyID);

    res.status(200).json(resp);
  }
  catch(err){
     res.status(400).json(err);
     winston.error(err);

}
});


/**
 * Update a specific rule
 * @param {string} academy.name
 * @param {Array<Project>} academy.projects
 * @param {boolean} rule.deleted
 * @return {Notification}
 * Endpoint : PUT http://localhost:<port>/academy/<id>
 */
router.put("/:id", async (req, res) => {
  try{
    const academyID = req.params.id;
    const academy = req.body;
    const resp = await Academy.updateOne({ _id: academyID }, { $set: academy });
    res.status(200).json(resp);
  }
  catch(err){
     res.status(400).json(err.message);
     winston.error(err);

}
});




export default router;