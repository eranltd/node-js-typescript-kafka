"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var ruleSchema = new mongoose.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        required: true,
        max: 30,
        index: true,
        lowercase: true
    },
    entities: {
        type: mongoose_1.Schema.Types.Array,
        required: true
    },
    type: {
        type: mongoose_1.Schema.Types.String,
        // required: true
    },
    conditions: {
        type: mongoose_1.Schema.Types.Mixed,
        trim: true,
        required: true,
        unique: true
    },
    events: {
        type: mongoose_1.Schema.Types.Mixed,
        trim: true,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    enabled: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true
    },
    deleted: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true
    },
    triggered: {
        type: mongoose_1.Schema.Types.Number,
        default: 0
    }
}, { _id: true, timestamps: true, collection: 'rules' });
/**In Mongoose, a virtual is a property that is not stored in MongoDB. Virtual are typically used for computed properties on documents. */
ruleSchema.methods = {
    Enable: function () {
        return this.enabled = true;
    },
    Disable: function () {
        return this.enabled = false;
    },
    Delete: function () {
        return this.deleted = true;
    },
    Triggered: function () {
        return this.triggered += 1;
    }
};
// export WorkizRule model
module.exports = mongoose.model('WorkizRule', ruleSchema);
//TODO : fix unique role by xyz
//# sourceMappingURL=Rule.model.js.map