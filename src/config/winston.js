var appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;


/*
level - Level of messages to log.
filename - The file to be used to write log data to.
handleExceptions - Catch and log unhandled exceptions.
json - Records log data in JSON format.
maxsize - Max size of log file, in bytes, before a new file will be created.
maxFiles - Limit the number of files created when the size of the logfile is exceeded.
colorize - Colorize the output. This can be helpful when looking at console logs.
*/

/**
 * 
 * Logging levels indicate message priority and are denoted by an integer. Winston uses npm logging levels that are prioritized from 0 to 5 (highest to lowest):

    0: error
    1: warn
    2: info
    3: verbose
    4: debug
    5: silly
 * 
 */

    const myFormat = printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    });

    var options = {
      file: {
        level: 'info',
        filename: `${appRoot}/log/activity.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        timestamp: true
      },
        console: {
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
          timestamp: true
        },
      };

      var logger =  createLogger({
        format: combine(
          timestamp(),
          myFormat
        ),
        transports: [
          new transports.File(options.file),
          new transports.Console(options.console)
        ],
        exitOnError: false, // do not exit on handled exceptions
      });
       
      logger.stream = {
        write: function(message, encoding) {
          logger.info(message);
        },
      };

      module.exports = logger;

      