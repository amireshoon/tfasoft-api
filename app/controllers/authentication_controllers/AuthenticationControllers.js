/*
    Controllers: Authentication
    Controller: Authentication
*/

const Admin = require('../../models/admin');
const User = require('../../models/user');

const AuthUser = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const data = req.body;

    Admin.findOne({access_token: data.access_token})
        .then((admin_result) => {
            if (admin_result === null) {
                res.status(401);
                res.send({
                    message: "Admin access token is not valid"
                });
            } else {
                User.findOneAndUpdate({token: data.user_token}, {token: null})
                    .then((user_result) => {
                        if (user_result === null) {
                            res.status(401);
                            res.send({
                                message: "User authentication token is not valid"
                            });
                        } else {
                            res.status(200);
                            res.send({
                                user: user_result
                            });
                        }
                    })
                    .catch((error) => {
                        res.status(500);
                        res.send(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500);
            res.send(error);
        });
}

module.exports = {
    AuthUser,
}