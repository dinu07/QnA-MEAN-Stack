const express = require('express');
const router = express.Router();

const topicsApi = require('../services/topics');
const questionsApi = require('../services/questions');

const DEFAULT_LIMIT = 25;

/**
 * Handles GET all topics
 */
router.get('/', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : DEFAULT_LIMIT;
    topicsApi.getAllTopics(limit)
        .then((topics) => {
            res.json(topics);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

/**
 * Handles GET topic by id
 */
router.get('/:id', (req, res) => {
    const topicId = req.params.id;
    topicsApi.getTopicById(topicId)
        .then((topic) => {
            if (!topic) {
                return res.sendStatus(404);
            }
            return res.json(topic);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

/**
 * Handles GET all questions of the topic
 */
router.get('/:topicId/questions', (req, res) => {
    const topicId = req.params.topicId;

    questionsApi.getAllQuestions()
        .then((questions) => {
            const filteredQuestions = questions.filter((q) =>
                q.topic._id.equals(topicId)
            );
            return res.status(200).json(filteredQuestions);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

/**
 * Handles Creation of question underneath the topic
 */
router.post('/:topicId/questions/', (req, res) => {
    const topicId = req.params.topicId;

    const newQuestion = {
        topic: topicId,
        description: req.body ? req.body.description : ''
    };

    questionsApi.saveQuestion(newQuestion).then((savedQuestion) => {
        return res.status(201).json(savedQuestion);
    }).catch((err) => {
        console.error(err);
        return res.sendStatus(500);
    });
});

module.exports = router;
