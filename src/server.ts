const winston = require("../src/config/winston");

import express from "express";

/*Application config */
import envConfig from './config/config';

/**Init Controllers */
import {loadAllControllers} from './controllers/controllers';

/**Init Middlewares */
import {loadAllMiddlewares} from './middlewares/middlewares';

/*Init Services  */

import {loadAllServices} from './services/services';

const app = express();
app.set('view engine', 'html');

export async function main() {
    app.listen(envConfig.port, () => {
        winston.info(`[main] , API is running on port , ${envConfig.port}`)
    })

     await loadAllMiddlewares(app); /*JWT, morgan, ... */
     await loadAllControllers(app); 
     await loadAllServices(app); /*MongoDB, customService, Singleton, ... */

    if (process.env.NODE_ENV === 'production') {
        winston.info(`[server], static serve of:  ${envConfig.client_build_path}`);
        app.use('/*', express.static(envConfig.client_build_path))
    }

    return "Server has been initialized successfully"
}

main()
    .then(winston.info)
    .catch(winston.error)