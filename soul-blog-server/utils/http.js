const express = require('express')

const router = express.Router()

module.exports = {
  get: router.get,
  post: router.post,
  delete: router.delete,
  put: router.put
}