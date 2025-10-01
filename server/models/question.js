const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Schema = mongoose.Schema;
const AbstractSchema = require('./abstract');
const ObjectId = Schema.Types.ObjectId;

/**
 * Model for Question. It extends abstract model.
 */
const QuestionSchema = extendSchema(AbstractSchema, {
    topic: {type: ObjectId, ref: 'Topic', required: true}
});

// Duplicate the ID field.
QuestionSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
QuestionSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Question', QuestionSchema);
