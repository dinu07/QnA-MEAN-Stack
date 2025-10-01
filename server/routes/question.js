const express = require('express');
const router = express.Router();

const questionsApi = require('../services/questions');
const commentsApi = require('../services/comments');

/**
 * Handles GET all questions
 */
router.get('/', (req, res) => {
    questionsApi.getAllQuestions()
        .then((questions) => {
            return res.json(questions);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

/**
 * Handles GET question by id
 */
router.get('/:id', (req, res) => {
    const questionId = req.params.id;

    questionsApi.getQuestionById(questionId)
        .then((question) => {
            const existingQuestion = question;
            if (existingQuestion) {
                return res.json(existingQuestion);
            }
            return res.sendStatus(404);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

/**
 * Handles delete a question
 */
router.delete('/:id', (req, res) => {
    const questionId = req.params.id;

    questionsApi.deleteQuestionById(questionId)
        .then((foundQuestion) => {
            if (foundQuestion) {
                return res.sendStatus(200);
            }
            return res.sendStatus(404);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

/**
 * Handles GET all comments of the question
 */
router.get('/:questionId/comments', (req, res) => {
    const questionId = req.params.questionId;

    commentsApi.getAllComments()
        .then((comments) => {
            return res.json(comments.filter((c) => c.question._id.equals(questionId)));
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

/**
 * Handles POST a comment on a question
 */
router.post('/:questionId/comments', (req, res) => {
    const questionId = req.params.questionId;

    const newComment = {
        question: questionId,
        description: req.body ? req.body.description : ''
    };

    commentsApi.saveComment(newComment)
        .then((savedComment) => {
            return res.status(201).json(savedComment);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

module.exports = router;
