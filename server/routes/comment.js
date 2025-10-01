const express = require('express');
const router = express.Router();

const commentsApi = require('../services/comments');

/**
 * Handles GET a comment
 */
router.get('/:id', (req, res) => {
    const commentId = req.params.id;

    commentsApi.getCommentById(commentId)
        .then((comment) => {
            const existingComment = comment;
            if (existingComment) {
                return res.json(existingComment);
            }
            return res.sendStatus(404);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

/**
 * Handles delete a comment
 */
router.delete('/:id', (req, res) => {
    const commentId = req.params.id;
    commentsApi.deleteCommentById(commentId)
        .then((comment) => {
            const existingComment = comment;
            if (existingComment) {
                return res.sendStatus(200);
            }
            return res.sendStatus(404);
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
});

module.exports = router;
