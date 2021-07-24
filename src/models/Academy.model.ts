import { Schema } from "mongoose";
const mongoose = require('mongoose');

const academySchema = new mongoose.Schema(
    {
        name: {
            type: Schema.Types.String,
            trim: true,
            required: true,
            max: 30,
            index: true,
            lowercase: true
        },
        ID: {
            type: Schema.Types.Number,
            required: true
        },
        projects: { 
            type: Schema.Types.Mixed ,
            trim: true,
            //required: true,
            // unique: true /**works only when db isn't created yet. (auto-index) */
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deleted: {
            type: Schema.Types.Boolean,default : false,
            required: true,
            //  unique: true /**works only when db isn't created yet. (auto-index) */
        },
    },
    { _id:true,timestamps: true,  collection: 'academy', autoIndex: true  }
);

/**In Mongoose, a virtual is a property that is not stored in MongoDB. Virtual are typically used for computed properties on documents. */

academySchema.methods = {  
    UnDelete :function() {
        return this.deleted = false;
    },

    Delete :function() {
        return this.deleted = true;
    }
};



// export WorkizRule model
module.exports = mongoose.model('WorkizAcademy', academySchema);
