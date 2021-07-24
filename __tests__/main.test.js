require('dotenv').config()
const mongoose = require('mongoose');

const { WorkizRulesEngine } = require("../src/services/rulesEngine");
const Rule = require("../src/models/Rule.model.ts");
const TemplateRule = require("../src/models/TemplateRule.model");
const {loadAllServices} = require('../src/services/services');

/*Application config */
const example_rule = require('./rule.example.json');

describe("Mongo && Rules Engine Connectivity (CRUD on Rule) ?", () => {

      //INIT ENV
      //INIT MONGODB
      //USE DB_MONGO_CLOUD_URL

       loadAllServices(); 
      const _rulesEngine = WorkizRulesEngine.getInstance();

      afterAll(() => closeMongoose());


      it("Testing Rules-Engine - CREATE -> Validate -> REMOVE", async() => {
       //add rule

      const ruleInstance = new Rule();
      await new Promise((r) => setTimeout(r, 2000));

      // const added = await Rule(example_rule).save();
       const added = await Rule.findOneAndUpdate(example_rule.conditions.all, example_rule, {
              new: true,
              upsert: true // Make this update into an upsert
            });

      _rulesEngine.addRule(example_rule);
     
       await new Promise((r) => setTimeout(r, 2000));

      console.log(added);
      // validate rule
      const result = await _rulesEngine.validate({"account_id":"818"}); //return promise from that call.
      expect(result.success).toEqual(true);

      // //remove rule
      // const id = added._id;
      // Rule.findByIdAndDelete({_id:id});

      });

      it("Testing template_rules was init through mongoDB", async() => {
        await new Promise((r) => setTimeout(r, 2000));
         const res = await TemplateRule.find();
        expect(res.length).toBeGreaterThanOrEqual(1);
        
      });

      
   });


  closeMongoose = () => {
    // Closing the DB connection allows Jest to exit successfully.
    try {
       mongoose.connection.close();
    } catch (error) {
      console.log(error);
    }
  }