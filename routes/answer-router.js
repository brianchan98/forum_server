const express = require('express');

const AnswCtrl = require('../controllers/answer-ctrl');

const router = express.Router();

router.post('/answer', AnswCtrl.createAnswer);
router.get('/answers', AnswCtrl.getAnswers);
router.get('/answer/:aid', AnswCtrl.getAnswer);
router.delete('/answer/:aid', AnswCtrl.deleteAnswer)

module.exports = router;