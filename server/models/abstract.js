const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Base Model that all other extend from
 */
const AbstractSchema = new Schema({
    description: {type: String, required: true},
    createdDate: {type: Date, required: true, default: Date.now}
});

module.exports = AbstractSchema;
