const express = require('express')
const { generateToken } = require('../middleware/auth')
const { privateDecrypto } = require('../keys')

const router = express.Router()
router.post('/login', (req, res) => {
  const { username, password } = privateDecrypto(req.body.encrypted)
  if(username === 'admin' && password === 'admin') {
    const token = generateToken(username)
    res.send({
      data: token,
      err: null,
      message: 'success',
      code: 200
    })
    return
  }

  res.send({
    data: '',
    err: '没有找到用户',
    message: null,
    code: 10034
  })
})

module.exports = router