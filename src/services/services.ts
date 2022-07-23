require("dotenv").config();
const winston = require("../config/winston");

import { kafkaMockProducer } from "./kafka/producer";

export const loadAllServices = async (app) => {
  try {
    await kafkaMockProducer();
  } catch (e) {
    winston.error(`Error  loading services`);
    winston.error(e.message);
  }
};
