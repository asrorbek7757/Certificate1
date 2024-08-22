const { Router } = require('express')

const login = Router();

const { getUser, Login, createUser, } = require('../controls/user')

login.get('/getUser', getUser);
login.post('/Login', Login);
login.post('/createUser', createUser);



module.exports = login