"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkizRulesEngine = void 0;
require('colors');
var Engine = require('json-rules-engine').Engine;
var Rule = require('../models/Rule.model');
var winston = require('../config/winston');
var get = require('lodash').get; // to use the lodash path resolver, for example
var util = require('util');
/**
 * WorkizRulesEngine is a wrapper for 'json-rules-engine' and will supply matching rules logic as a 'black-box'
 * @class
 * @classdesc This is a description of the MyClass class.
 */
var WorkizRulesEngine = /** @class */ (function () {
    function WorkizRulesEngine() {
        var _this = this;
        this.initEngine = function () { return __awaiter(_this, void 0, void 0, function () {
            var resp, options, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, Rule.find({ deleted: false, enabled: true })];
                    case 1:
                        resp = _b.sent();
                        return [4 /*yield*/, resp.map(function (x) { return WorkizRulesEngine.transform(x); })];
                    case 2:
                        resp = _b.sent();
                        winston.info("Engine Started with [" + (resp === null || resp === void 0 ? void 0 : resp.length) + "] rules");
                        console.log("Init Engine with [" + (resp === null || resp === void 0 ? void 0 : resp.length) + "] rules");
                        options = {
                            allowUndefinedFacts: true,
                            pathResolver: this.pathResolver
                        };
                        _a = this;
                        return [4 /*yield*/, new Engine(__spreadArray([], resp), options)];
                    case 3:
                        _a._engine = _b.sent();
                        //console.log('this._engin',this._engine.rules);
                        console.log("rulesEngine has been initialized");
                        /**
                        * On success, retrieve the student's username and print rule name for display purposes, and render
                        */
                        this._engine.on('success', function (event, almanac, ruleResult) {
                            console.log(util.inspect(ruleResult, false, null, true /* enable colors */));
                            var loggerSuccessMSG = ["Matched Rule: [" + ruleResult.name + "]", JSON.stringify(almanac), ruleResult.result].join(" ");
                            winston.info(loggerSuccessMSG);
                        });
                        /**
                         * On failure, retrieve the student's username and print rule name for display purposes, and render
                         */
                        this._engine.on('failure', function (event, almanac, ruleResult) {
                            var loggerErrorMSG = ["Error While Matching Rule: [" + ruleResult.name + "]", JSON.stringify(almanac), ruleResult.result].join(" ");
                            winston.info(loggerErrorMSG);
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        console.error("Error while init the rules engine");
                        console.error(err_1.message);
                        winston.error(err_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getEngine = function () { return _this._engine; };
        this.stopEngine = function () { return _this._engine.stop(); };
        this.refreshEngine = function () { _this.stopEngine(); _this.initEngine(); };
        this.DeleteRule = function () { return _this.refreshEngine(); };
        /*
        *load all rules,facts from the db and initialize the engine
        */
        this.initEngine();
    }
    WorkizRulesEngine.prototype.pathResolver = function (object, path) {
        // when the rule below is evaluated:
        //   "object" will be the 'fact1' value
        //   "path" will be '.price[0]'
        return get(object, path);
    };
    WorkizRulesEngine.prototype.addRule = function (rule) {
        var transformedRule = WorkizRulesEngine.transform(rule);
        if (rule.enabled)
            //console.log(transformedRule)
            this._engine.addRule(transformedRule);
    };
    /**
     * The static method that controls the access to the singleton instance.
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    WorkizRulesEngine.prototype.validate = function (facts) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var retObj, retMessage, success, results, events, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        retObj = {};
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._engine.run(facts)];
                    case 2:
                        retMessage = _b.sent();
                        success = Boolean(retMessage.results.length);
                        results = success ? (_a = retMessage.results) === null || _a === void 0 ? void 0 : _a.shift() : retMessage.failureResults;
                        events = retMessage.events;
                        retObj["rule_id"] = (results === null || results === void 0 ? void 0 : results.name);
                        retObj["success"] = success;
                        retObj["results"] = results;
                        retObj["events"] = events;
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        retObj["success"] = false;
                        retObj["results"] = [];
                        retObj["error"] = err_2.message;
                        winston.error(err_2.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, retObj];
                }
            });
        });
    };
    //input : 
    //object of {conditions} and {events}
    //output :
    //many json-parser objects {conditions,event}
    WorkizRulesEngine.transform = function (rule) {
        //convert our model to json-rules-engine model and return the object.
        /*create array of rules with the following schema:
        {events}x{conditions} = {conditions,event} */
        var _a;
        //we need to generate conditions per event
        var objArr = {
            name: (_a = rule === null || rule === void 0 ? void 0 : rule._id) !== null && _a !== void 0 ? _a : rule === null || rule === void 0 ? void 0 : rule.id,
            type: rule.type,
            conditions: __assign({}, rule.conditions),
            event: {
                type: "workizEvent",
                params: __spreadArray([], rule.events)
            }
        };
        return objArr;
    };
    WorkizRulesEngine.getInstance = function () {
        if (!WorkizRulesEngine.instance) {
            WorkizRulesEngine.instance = new WorkizRulesEngine();
        }
        return WorkizRulesEngine.instance;
    };
    return WorkizRulesEngine;
}());
exports.WorkizRulesEngine = WorkizRulesEngine;
//# sourceMappingURL=rulesEngine.js.map