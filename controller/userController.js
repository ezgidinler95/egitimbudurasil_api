const Users = require("../models/Users");
const jwt = require("jsonwebtoken");


exports.addUser = async (req, res) => {
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

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.json({
            code: 404,
            message: "Gerekli 'email' ve 'password' parametreleri gönderilmedi!!!"
        });
    }
    const { user, error } = await Users.getLogin(req.body);
    if (!error) {
        if (user) {
            if (user.password === req.body.password) {
                //  const token = jwt.sing()
                res.json({
                    code: 200,
                    data: {
                        user
                    }
                });
            } else {
                res.json({
                    code: 404,
                    message: "Girmiş olduğunuz şifre sistemde kayıtlı olanla aynı degil"
                });
            }
        }
        else {
            res.json({
                code: 404,
                message: "Böyle bir kullanıcı bulunamadı."
            });
        }

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
