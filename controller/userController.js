const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const md5 = require('md5');


exports.addUser = async (req, res) => {
    req.body.password = md5(req.body.password);
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
            if (user.password === md5(req.body.password)) {
                const payload = {
                    name: user.name
                };
                const token = jwt.sign(payload, req.app.get('api_secret_key'),
                    {
                        expiresIn: 720 // 12 saat
                    });
                console.log("token", token)
                res.json({
                    code: 200,
                    data: {
                        user,
                        token
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


