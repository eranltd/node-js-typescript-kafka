"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var rootFolder = path.resolve();
var environments = {
    development: 'development',
    test: 'test',
    production: 'production',
};
function loadEnvironments() {
    for (var NODE_ENV in environments) {
        var filepath = path.join(rootFolder, ".env." + NODE_ENV);
        console.log("Searching for " + NODE_ENV + " file," + filepath);
        if (fs.existsSync(filepath)) {
            console.log('[config]', '[loadEnvironments]', 'loading:', filepath);
            dotenv.config({ path: filepath });
        }
    }
    dotenv.config();
}
function loadConfig() {
    var port = parseInt(process.env.PORT) || 8082;
    var client_build_path = 'client/build';
    return {
        port: port,
        client_build_path: client_build_path,
    };
}
loadEnvironments();
var config = loadConfig();
exports.default = config;
//# sourceMappingURL=config.js.map