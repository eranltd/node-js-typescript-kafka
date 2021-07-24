"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var winston = require("../../config/winston");
var Rule = require("../../models/Rule.model");
var WorkizRulesEngine = require("../../services/rulesEngine").WorkizRulesEngine;
var router = express_1.default.Router();
var _rulesEngine = WorkizRulesEngine.getInstance();
var util = require('util'); /**use to implement console.dir in CLI */
/**
 * Dumb method, to check status of the API
 */
router.get("/health", function (req, res) {
    res.status(200).json({ "message": "I'm Alive" });
});
/**
 * Retrieve all rules from DB
 * Endpoint : GET http://localhost:<port>/rules/
 * @return {Array<Notifications>}
 */
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var urlParams, rules, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                urlParams = req.query;
                return [4 /*yield*/, Rule.find(urlParams)];
            case 1:
                rules = _a.sent();
                res.status(200).json(rules);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Create and store new rule
 * @param {object} rule - workiz rule
 * @param {string} rule.name
 * @param {Array<RuleCondition>} rule.conditions
 * @param {Array<RuleValidationEvent>} rule.events
 * @param {string} rule.createdAt
 * @param {string} rule.updatedAt
 * @param {boolean} rule.enabled
 * @return {Notifications}
 * Endpoint : POST http://localhost:<port>/rules
 */
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, conditions, events, createdAt, updatedAt, enabled, deleted, entities, ruleInstance, resp, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, conditions = _a.conditions, events = _a.events, createdAt = _a.createdAt, updatedAt = _a.updatedAt, enabled = _a.enabled, deleted = _a.deleted, entities = _a.entities;
                console.log(req.body);
                ruleInstance = new Rule({
                    name: name,
                    conditions: conditions,
                    events: events,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    enabled: enabled,
                    deleted: deleted,
                    entities: entities
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ruleInstance.save()];
            case 2:
                resp = _b.sent();
                res.status(201).json(resp);
                // //step 2 - add to existing engine instance (enabled == 1)
                if (enabled) {
                    _rulesEngine.addRule(ruleInstance);
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                res.status(400).json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * Delete a specific rule
 * @param {objectId} id - workiz rule id
 * @return {Notifications}
 * Endpoint : DELETE http://localhost:<port>/rules/<id>
 */
router.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ruleID, resp, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ruleID = req.params.id;
                return [4 /*yield*/, Rule.findById(ruleID)];
            case 1:
                resp = _a.sent();
                resp.Disable();
                resp.Delete();
                resp.save();
                _rulesEngine.DeleteRule(resp);
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json(err_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Enable a specific rule
 * @param {objectId} id - workiz rule id
 * @return {Notifications}
 * Endpoint : GET http://localhost:<port>/rules/enable/<id>
 */
router.put("/enable/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ruleID, resp, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ruleID = req.params.id;
                return [4 /*yield*/, Rule.findById(ruleID)];
            case 1:
                resp = _a.sent();
                resp.Enable();
                resp.save();
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Disable a specific rule
 * @param {objectId} id - workiz rule id
 * @return {Notifications}
 * Endpoint : GET http://localhost:<port>/rules/disable/<id>
 */
router.put("/disable/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ruleID, resp, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ruleID = req.params.id;
                return [4 /*yield*/, Rule.findById(ruleID)];
            case 1:
                resp = _a.sent();
                resp.Disable();
                resp.save();
                _rulesEngine.DeleteRule(resp);
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Get a specific rule
 * @param {objectId} id - workiz rule id
 * @return {Notifications}
 * Endpoint : GET http://localhost:<port>/rules/<id>
 */
router.get("/rule/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ruleID, resp, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ruleID = req.params.id;
                return [4 /*yield*/, Rule.findById(ruleID)];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(400).json(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Get a specific rule
 * @param {objectId} id - workiz rule id
 * @param {account_id} account_id - workiz account id via queryParams
 * @return {Notification}
 * Endpoint : GET http://localhost:<port>/rules/<id>
 */
router.get("/ruleByAccount/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ruleID, account_id, resp, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ruleID = req.params.id;
                account_id = req.query.account_id;
                return [4 /*yield*/, Rule.findOne({
                        "_id": ruleID,
                        "conditions.all.fact": 'account_id',
                        'conditions.all.value': account_id.toString() || ""
                    })];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(400).json(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Get a specific rule
 * @param {objectId} id - workiz rule id
 * @return {Notification}
 * Endpoint : GET http://localhost:<port>/rules/<id>
 */
router.get("/rulesByAccount/:account_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var account_id, rule, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                account_id = req.params.account_id;
                return [4 /*yield*/, Rule.find({
                        "conditions.all.fact": 'account_id',
                        'conditions.all.value': account_id.toString() || ""
                    })];
            case 1:
                rule = _a.sent();
                res.status(200).json(rule);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                res.status(400).json(err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Update a specific rule
 * @param {objectId} id - workiz rule id
 * @param {object} rule - workiz rule
 * @param {string} rule.name
 * @param {Array<RuleCondition>} rule.conditions
 * @param {Array<RuleValidationEvent>} rule.events
 * @param {string} rule.createdAt
 * @param {string} rule.updatedAt
 * @param {boolean} rule.enabled
 * @return {Notification}
 * Endpoint : PUT http://localhost:<port>/rules/<id>
 */
router.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ruleID, rule, resp, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ruleID = req.params.id;
                rule = req.body;
                return [4 /*yield*/, Rule.updateOne({ _id: ruleID }, { $set: rule })];
            case 1:
                resp = _a.sent();
                _rulesEngine.refreshEngine();
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                res.status(400).json(err_9.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Adds 1 to rule trigger count
 * @param {string} ruleID - ruleID
 * Endpoint : http://localhost:<port>/rules/triggered
 */
router.put("/triggered/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ruleID, resp, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ruleID = req.params.id;
                return [4 /*yield*/, Rule.findById(ruleID)];
            case 1:
                resp = _a.sent();
                resp.Triggered();
                resp.save();
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                res.status(400).json(err_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Validate Facts against existing rule.
 * @param {Array<Fact>} workizFacts - collection of workiz facts
 * @param {string} workizFacts.fact - fact name
 * @param {string} workizFacts.value - fact value
 *
 * "workizFacts":[{"fact":"job_id","value":"818"},...]
 *
 * Endpoint : http://localhost:<port>/rules/validate
 */
router.post("/validate", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var facts, result, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                facts = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                facts = JSON.parse(JSON.stringify(facts, replacer));
                return [4 /*yield*/, _rulesEngine.validate(facts)];
            case 2:
                result = _a.sent();
                res.status(201).json(result);
                return [3 /*break*/, 4];
            case 3:
                err_11 = _a.sent();
                res.status(201).json(err_11);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
function replacer(key, value) {
    if (typeof value === 'number') {
        return value.toString();
    }
    return value;
}
exports.default = router;
//# sourceMappingURL=rules.js.map