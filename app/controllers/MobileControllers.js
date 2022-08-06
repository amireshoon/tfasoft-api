const User = require('../models/user');

const auth = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const body = req.body;

    User.findOne(body)
        .then((result) => {
            if (result === null) {
                const data = {
                    message: "User is not found",
                }

                res.status(401);
                res.send(data);
            }
            else {
                res.status(200);
                res.send(result);
            }
        })
        .catch((error) => {
            res.status(500);
            res.send(error);
        });
}

const connect = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const mcode = req.body.mcode;

    User.findOne({ mcode })
        .then((result) => {
            if (result === null) {
                const data = {
                    message: "Sorry, you are not registered.",
                }

                res.status(401);
                res.send(data);
            }
            else {
                res.status(200);
                res.send(result);
            }
        })
        .catch((error) => {
            res.status(500);
            res.send(error);
        });
}

module.exports = {
    auth,
    connect,
}