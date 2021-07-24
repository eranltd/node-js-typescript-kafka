const mongoose = require('mongoose');
require('dotenv').config();
const winston = require("../config/winston");

const COLLECTION_NOT_FOUND = 'NamespaceNotFound';

const InitMongoDB = () => {

        const mongoDBUri = `mongodb://${process.env.DB_MONGO_CLOUD_URL}`;
        winston.info(`mongoDBUri : [${mongoDBUri}]`);

        // db
         const mongoInstance = mongoose.connect(mongoDBUri , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            poolSize : 5
        });

        mongoose.connection.on('connected', function(){
            winston.info(`Mongoose default connection is open at : [${mongoDBUri}]`);

        });
    
        mongoose.connection.on('error', function(err){
            winston.error(`Mongoose default connection has occurred  : ${err.message}`);
        });
    
        mongoose.connection.on('disconnected', function(){
            winston.info(`Mongoose default connection is disconnected`);
        });
    }


export const loadAllServices = (app) => {
    InitMongoDB();
}
