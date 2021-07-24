"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllControllers = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var loadAllControllers = function (app) {
    var source = path_1.default.resolve(__dirname, './');
    var controllers = fs_1.readdirSync(source, { withFileTypes: true })
        .filter(function (dirent) { return dirent.isDirectory(); })
        .map(function (dirent) { return dirent.name; });
    controllers.forEach(function (controllerName) {
        var controller = require("../controllers/" + controllerName + "/" + controllerName);
        console.log("Registering " + controllerName + " Controller");
        app.use("/" + controllerName, controller.default);
    });
    app.get('/', function (req, res) {
        controllers.forEach(function (controllerName) {
            var result = "Application Endpoints :<br/>";
            result += "/" + controllerName + "<br/>";
            res.send(result);
        });
    });
};
exports.loadAllControllers = loadAllControllers;
//# sourceMappingURL=controllers.js.map