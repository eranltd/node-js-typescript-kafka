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
var winston = require('winston');
var enumerateErrorFormat = winston.format(function (info) {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
var Logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(enumerateErrorFormat(), process.env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(), winston.format.splat(), winston.format.printf(function (_a) {
        var level = _a.level, message = _a.message;
        return level + ": " + message;
    })),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});
module.exports = Logger;
//# sourceMappingURL=logger.js.map