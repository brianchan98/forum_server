const User = require('../models/user-model');

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                error: 'User not created!',
            });
        });
};

userLogin = async(req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ success: false, error: err });
    }
    
    await User.findOne({ "email": req.params.email }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            });
        }

        if (!user) {
            return res
                .status(200)
                .json({ success: false, message: "User not found" });
        }

        if (user.password === req.params.pwd) {
            return res.status(200).json({ success: true, message: "Signed In Successfully", data: user });
        }
        
        return res.status(200).json({ success: false, message: "Password incorrect!" });

    }).catch(err => console.log(err))
};

getUsers = async (req, res) => {
    await User.find({}, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!user.length) {
            return res
                .status(400)
                .json({ success: false, data: `No user` });
        }
        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
};

module.exports = {
    createUser,
    getUsers,
    userLogin,
};
