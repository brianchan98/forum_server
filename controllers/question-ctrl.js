const Question = require('../models/question-model')

createQuestion = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a question',
        });
    }

    const question = new Question(body);

    if (!question) {
        return res.status(400).json({ success: false, error: err });
    }

    question
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: question._id,
                message: 'Question created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Question not created!',
            });
        });
};

getQuestion = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ success: false, error: err });
    }
    
    await Question.findOne({ "qid": req.params.qid }, (err, question) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Question not found!',
            });
        }

        if (!question) {
            return res
                .status(200)
                .json({ success: false, error: "Question not found" });
        }
        
        return res.status(200).json({ success: true, data: question });

    }).catch(err => console.log(err))
}

getQuestions = async (req, res) => {
    await Question.find({}, (err, question) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!question.length) {
            return res
                .status(400)
                .json({ success: false, data: `Question not found` });
        }
        return res.status(200).json({ success: true, data: question });
    }).catch(err => console.log(err));
};

vote = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Question.findOne({ "qid": req.params.qid }, (err, question) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Question not found!',
            })
        }
        question.up = body.up
        question
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: question.qid,
                    message: 'Upvoted!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Not upvoted!',
                })
            })
    })
}

answered = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Question.findOne({ "qid": req.params.qid }, (err, question) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Question not found!',
            })
        }
        question.answer = body.answer
        question
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: question.qid,
                    message: 'Answered!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Not Answered!',
                })
            })
    })
}

deleteQuestion = async (req, res) => {
    await Question.findOneAndDelete({ "qid": req.params.qid }, (err, question) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: question })
    }).catch(err => console.log(err))
}

updateQuestion = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Question.findOne({ "qid": req.params.qid }, (err, question) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Question not found!',
            })
        }

        question.title = body.title
        question.space = body.space
        question.content = body.content

        question
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: question.qid,
                    message: 'Updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Not updated!',
                })
            })
    })
}

module.exports = {
    createQuestion,
    getQuestion,
    getQuestions,
    vote,
    answered,
    deleteQuestion,
    updateQuestion,
}