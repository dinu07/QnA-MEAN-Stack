const {TOPICS} = require('./mock-store');
const mockGenerator = require('./mock-generator');
const Topic = require('../models/topic');
const Question = require('../models/question');
const Comment = require('../models/comment');

const populateStore = () => {
    Comment.deleteMany({});
    Question.deleteMany({});
    Topic.deleteMany({});

    const SAVED_TOPICS = [];

    TOPICS.forEach((t) => {
        const newTopic = new Topic({...t});
        newTopic.save(function(err) {
            if (err) {
                throw err;
            }
        });
        SAVED_TOPICS.push(newTopic);
    });

    const QUESTIONS = [];
    const SAVED_QUESTIONS = [];
    SAVED_TOPICS.forEach((topic, idx) => {
        Array.prototype.push.apply(QUESTIONS, mockGenerator.questionsGenerator(topic, 4 * idx));
    });

    QUESTIONS.forEach((q) => {
        const newQuestion = new Question({ ...q });
        newQuestion.save(function(err) {
            if (err) {
                throw err;
            }
        });
        SAVED_QUESTIONS.push(newQuestion);
    });

    const COMMENTS = [];
    SAVED_QUESTIONS.forEach((question) => {
        Array.prototype.push.apply(COMMENTS, mockGenerator.commentsGenerator(question, 2));
    });

    COMMENTS.forEach((c) => {
        const newComment = new Comment({...c});
        newComment.save(function(err) {
            if (err) {
                throw err;
            }
        });
    });

    console.log('Total topics', SAVED_TOPICS.length);
    console.log('Total questions', SAVED_QUESTIONS.length);
    console.log('Total comments', COMMENTS.length);
};

module.exports = populateStore;
