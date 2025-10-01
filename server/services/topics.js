const Topic = require('../models/topic');
/**
 * Api for all CRUD operations on Topic. Implemented using Mongoose API
 */
module.exports = {
    /**
     * READ all topics.
     * @param {Number} limit - the search results limit parameter
     * @return  {Promise} for Array<Topic>
     */
    getAllTopics: (limit) => {
        return Topic.find({})
            .limit(limit)
            .sort({createdDate: 'desc'});
    },
    /**
     * READ topic by id.
     *
     * @param {String} topicId - the topic id
     * @return {Promise} for Topic
     */
    getTopicById: (topicId) => {
        return Topic.findById(topicId);
    }
};
