const express = require('express');
const { tokenVerify } = require('./helpers/helpers');
const { login } = require('./services/authentication/login');
const { registerMethod } = require('./services/authentication/register');

const app = express()
app.use(express.json())    // <==== parse request body as JSON
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/register', function (req, res) {
  registerMethod(req.body, req, res);
})

app.post('/login', (req, res) => {
  login(req.body, res);
})

app.post('/profile', tokenVerify, (req, res) => {
  res.send(res.locals)
})

app.listen(5000)