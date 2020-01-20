const express = require('express');
const router = express.Router();

const userController = require("../controller/userController.js");

router.post('/', userController.addUser);
router.post('/login', userController.login);

router.get('/all', userController.allUsers);


module.exports = router;








