const Users = require("../models/Users");

exports.addUser = async (req, res) => {
    console.log("burda");
    const { user, error } = await Users.addUser(req.body);
    if (!error) {
        res.json({
            code: 200,
            data: {
                user
            }
        });
    } else {
        res.json({
            code: 422,
            message: error.message
        });
    }
}

exports.allUsers = async (req, res) => {

    const { users, error } = await Users.allUsers(req.body);
    if (!error) {
        res.json({
            code: 200,
            data: {
                users
            }
        });
    } else {
        res.json({
            code: 422,
            message: error.message
        });
    }
}