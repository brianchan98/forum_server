const Answer = require('../models/answer-model')

createAnswer = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a answer',
        });
    }

    const answer = new Answer(body);

    if (!answer) {
        return res.status(400).json({ success: false, error: err });
    }

    answer
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: answer._id,
                message: 'Answer created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Answer not created!',
            });
        });
};

getAnswers = async (req, res) => {
    await Answer.find({}, (err, answer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!answer.length) {
            return res
                .status(400)
                .json({ success: false, data: `Answer not found` });
        }
        return res.status(200).json({ success: true, data: answer });
    }).catch(err => console.log(err));
};

getAnswer = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ success: false, error: err });
    }
    
    await Answer.findOne({ "aid": req.params.aid }, (err, answer) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Answer not found!',
            });
        }

        if (!answer) {
            return res
                .status(200)
                .json({ success: false, error: "Answer not found" });
        }
        
        return res.status(200).json({ success: true, data: answer });

    }).catch(err => console.log(err))
}

deleteAnswer = async (req, res) => {
    await Answer.findOneAndDelete({ "aid": req.params.aid }, (err, answer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: answer })
    }).catch(err => console.log(err))
}

module.exports = {
    createAnswer,
    getAnswers,
    getAnswer,
    deleteAnswer
}