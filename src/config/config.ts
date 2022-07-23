import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
const winston = require("./winston");

const rootFolder = path.resolve();

const environments = {
  development: "development",
  test: "test",
  production: "production",
  staging: "staging",
};

const NODE_ENV = process.env.NODE_ENV;

function loadEnvironments() {
  /**check for the right env file */

  const defaultFilePath = path.join(rootFolder, `.env`);
  const envFilePath = path.join(rootFolder, `.env.${NODE_ENV}`);

  if (environments[NODE_ENV] != undefined) {
    winston.info(`Searching for ${NODE_ENV} file,${envFilePath}`);
    if (fs.existsSync(envFilePath)) {
      winston.info(`[config] [loadEnvironments] loaded: ${envFilePath}`);
      dotenv.config({ path: envFilePath });
    }
  } else if (fs.existsSync(defaultFilePath)) {
    //     //try take .env
    winston.info(`[config] [loadEnvironments] loaded: ${defaultFilePath}`);
    dotenv.config({ path: envFilePath });
  } else {
    winston.info(
      `[config] [loadEnvironments] could not load any .env config including .env.${Object.keys(
        environments
      ).join(" | ")}`
    );
  }

  //tell the user, do not load.

  dotenv.config();
}

function loadConfig() {
  const port = parseInt(process.env.PORT) || 8082;
  const client_build_path = "client/build";

  return {
    port,
    client_build_path,
  };
}

loadEnvironments();
const config = loadConfig();

export default config;
