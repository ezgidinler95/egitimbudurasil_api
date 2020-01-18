const express = require('express');
const router = express.Router();

const userController = require("../controller/userController.js");

router.post('/', userController.addUser);
// router.get('/all', userController.allUsers);
// router.get('/',userController.getUser);

module.exports = router;








