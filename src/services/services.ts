require("dotenv").config();
const InitKafkaMockProducer = require("./kafka/producer");

export const loadAllServices = async (app) => {
  try {
    await InitKafkaMockProducer();
  } catch (e) {
    console.log("Error  loading services: ", e);
  }
};
