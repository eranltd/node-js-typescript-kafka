const morgan = require("morgan");
const config = require("../config/config");
const logger = require("../logger");
var winston = require("../config/winston");
var bodyParser = require("body-parser");

export const loadAllMiddlewares = (app) => {
  /**setup morgan with winston */
  app.use(
    morgan(
      ":method | :url | :status | :res[content-length] bytes :response-time ms",
      {
        stream: winston.stream,
        skip: (req, res) => {
          return req.url === "/" || req.url === "/health";
        },
      }
    )
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));
  // app.use(cors({ origin: process.env.CLIENT_URL }));

  // error handler
  app.use(function (err, req, res, next) {
    //TBD : refactor message format
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // add this line to include winston logging
    res.statusCode >= 400
      ? winston.info(
          `${err.status || 500} - ${err.message.trim()} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        )
      : winston.error(
          `${err.status || 500} - ${err.message.trim()} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        );

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    next();
  });
};
