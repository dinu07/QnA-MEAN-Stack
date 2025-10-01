const Question = require('../models/question');

/**
 * Api for all CRUD operations on Question. Implemented using Mongoose API
 */
module.exports = {
    /**
     * READ all questions & sort them by created Date in DESC order
     * @return {Promise}
     */
    getAllQuestions: (() => {
        return Question.find({}).sort({createdDate: 'desc'});
    }),

    /**
     * CREATE a new question & Returns the saved question
     * @param {Question} question to save
     * @return {Promise} the saved question
     */
    saveQuestion: ((question) => {
        const newQuestion = new Question({...question});
        return newQuestion.save(newQuestion);
    }),

    /**
     * READ a question by id
     * @param {String} questionId the question looking for
     * @return {Promise}
     */
    getQuestionById: (questionId) => {
        return Question.findById(questionId);
    },
    /**
     * DELETE a question by id
     * @param {String} questionId of the question
     * @return {Promise}
     */
    deleteQuestionById: (questionId) => {
        return Question.findByIdAndRemove(questionId);
    }
};
