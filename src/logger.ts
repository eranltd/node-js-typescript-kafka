/**at our company we are using cloud based logging, build on top of file-based logs
 * save your logs to ~\log with the following hierarchy 
   log\access.log
   log\activity.log
   log\error.log
*/

//https://blog.logrocket.com/node-js-logging-best-practices/
// https://www.npmjs.com/package/winston
//winston
//morgan

//... */
const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const Logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = Logger;
