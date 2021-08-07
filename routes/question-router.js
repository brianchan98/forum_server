const express = require('express');

const QuesCtrl = require('../controllers/question-ctrl');

const router = express.Router();

router.post('/question', QuesCtrl.createQuestion);
router.get('/questions', QuesCtrl.getQuestions);
router.post('/vote/:qid', QuesCtrl.vote);
router.post('/questionAnswered/:qid', QuesCtrl.answered);
router.get('/question/:qid', QuesCtrl.getQuestion);
router.delete('/question/:qid', QuesCtrl.deleteQuestion)
router.post('/questionupdate/:qid', QuesCtrl.updateQuestion);

module.exports = router;