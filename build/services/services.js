"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllServices = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
//https://dev.to/getd/how-to-manage-secrets-and-configs-using-dotenv-in-node-js-and-docker-2214
var loadAllServices = function (app) {
    var mongoDBUri = "mongodb://" + process.env.DB_MONGO_CLOUD_URL;
    // db
    var mongoInstance = mongoose_1.default.connect(mongoDBUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        poolSize: 5
    });
    mongoose_1.default.connection.on('connected', function () {
        console.log("Mongoose default connection is open to ", mongoDBUri);
    });
    mongoose_1.default.connection.on('error', function (err) {
        console.error("Mongoose default connection has occured " + err + " error");
    });
    mongoose_1.default.connection.on('disconnected', function () {
        console.log("Mongoose default connection is disconnected");
    });
    mongoInstance.then(
    /** ready to use.
    * The `mongoose.connect()` promise resolves to mongoose instance. */
    function () { console.log('\r\n\r\nMongoDB connected\r\n\r\n', mongoDBUri); }, 
    /** handle initial connection error */
    function (err) { console.log(err); });
};
exports.loadAllServices = loadAllServices;
//# sourceMappingURL=services.js.map