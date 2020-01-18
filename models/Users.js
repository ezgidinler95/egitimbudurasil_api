const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateModified: {
        type: Date
    }

});

const Users = module.exports = mongoose.model('Users', userSchema, 'Users');

module.exports.addUser = async (params) => {
    const user = new Users(params);
    try {
        return user.save()
            .then(async (savedUser) => {
                return { user: savedUser };
            })
            .catch((error) => {
                return { error };
            });
    } catch (error) {
        return { error };
    }
}

module.exports.allUsers = () => {
    try {
        return Users.find({})
            .then((users) => {
                return { users };
            })
            .catch((error) => {
                return { error };
            });
    } catch (error) {
        return { error };
    }
}

module.exports.getUser = () => {
    try {
        return Users.findOne({ email: email })
            .then((users) => {
                return { users };
            })
            .catch((error) => {
                return { error };
            });
    } catch (error) {
        return { error };
    }
}