const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const AbstractSchema = require('./abstract');

/**
 * Model for Topic. It extends abstract model.
 */
const TopicSchema = extendSchema(AbstractSchema, {
    name: {type: String, required: true}
});

// Duplicate the ID field.
TopicSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TopicSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Topic', TopicSchema);
