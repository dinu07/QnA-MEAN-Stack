const Comment = require('../models/comment');

/**
 * Api for all CRUD operations on Comment. Implemented using Mongoose API
 */
module.exports = {
    /**
     * READ all comment & sort them by created Date in DESC order
     * @return {Promise}
     */
    getAllComments: (() => {
        return Comment.find({}).sort({createdDate: 'desc'});
    }),

    /**
     * CREATE a new comment & Returns the saved comment
     * @param {Object} comment object to save
     * @return {Promise}
     */
    saveComment: ((comment) => {
        const newComment = new Comment({...comment});
        return newComment.save(newComment);
    }),

    /**
     * READ a comment by id
     * @param {String} commentId of the comment looking for
     * @return {Promise}
     */
    getCommentById: (commentId) => {
        return Comment.findById(commentId);
    },
    /**
     * DELETE a comment by id
     * @param {String} commentId of the comment
     * @return {Promise}
     */
    deleteCommentById: (commentId) => {
        return Comment.findByIdAndRemove(commentId);
    }
};
