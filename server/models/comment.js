const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Schema = mongoose.Schema;
const AbstractSchema = require('./abstract');
const ObjectId = Schema.Types.ObjectId;
/**
 * Model for Comment. It extends abstract model.
 */
const CommentSchema = extendSchema(AbstractSchema, {
    question: {type: ObjectId, ref: 'Question', required: true}
});

// Duplicate the ID field.
CommentSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CommentSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Comment', CommentSchema);
