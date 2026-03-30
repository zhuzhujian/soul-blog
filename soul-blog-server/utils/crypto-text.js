const path = require('node:path')
const { existsSync, writeFileSync, readFileSync } = require('node:fs')
const { scryptSync, createCipheriv, randomFillSync, createDecipheriv } = require('node:crypto');

const algorithm = 'aes-256-ctr';
const salt = 'soul_salt';
const password = 'soul_password'

function initSecretKey() {
  const key = scryptSync(password, salt, 32)
  return key.toString('hex')
}

function getSecretKey() {
  const filePath = path.join(__dirname, '/key', 'secret.txt')
  if(!existsSync(filePath)) {
    const key = initSecretKey()
    writeFileSync(filePath, key)
    return key
  }
  readFileSync(filePath)
}

function encrypt(content) {
  const buf = Buffer.alloc(16)
  const vi = randomFillSync(buf)
  const secret = getSecretKey()
  const cipher = createCipheriv(algorithm, secret, vi)
  const enciphered = Buffer.concat([cipher.update(content), cipher.final()])
  return {
    vi: vi.toString('hex'),
    context: enciphered.toString('hex')
  }
}

function decrypt(cryptMap) {
  const { vi, context } = cryptMap
  const secret = getSecretKey()
  const decipher = createDecipheriv(algorithm, secret, Buffer.from(vi, 'hex'))
  const content = Buffer.concat([decipher.update(Buffer.from(context, 'hex')), decipher.final()])
  return content.toString()
}

module.exports = {
  encrypt,
  decrypt
}