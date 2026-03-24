// @ts-nocheck
const fs = require('node:fs')
const crypto = require('node:crypto')
const path = require('node:path')

const createKey = () => {
  // 生成RSA密钥对
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048
  })

  // 导出密钥对为pem格式
  const publicKeyPem = publicKey.export({ type: 'pkcs1', format: 'pem' }).toString()
  const privateKeyPem = privateKey.export({ type: 'pkcs1', format: 'pem'}).toString()
  return {
    publicKeyPem,
    privateKeyPem
  }
}

function getPubKeyPem() {
  try {
    console.log(__dirname)
    const filePath = path.join(__dirname, 'public.pem')
    const publickKey = fs.readFileSync(filePath, { encoding: 'utf-8'})
    if(!publickKey) {
      const { publicKeyPem, privateKeyPem } = createKey()
      setPubKeyPem(publicKeyPem)
      setPrivateKeyPem(privateKeyPem)
      return publicKeyPem
    }
    return publickKey
  } catch(e) {
    throw(e)
  }
}

function setPubKeyPem(pubKey) {
  const filePath = path.join(__dirname, 'public.pem')
  fs.writeFileSync(filePath, pubKey)
}

function getPrivateKeyPem() {
  try {
    console.log(__dirname)
    const filePath = path.join(__dirname, 'private.pem')
    const privateKey = fs.readFileSync(filePath, { encoding: 'utf-8'})
    if(!privateKey) {
      const { publicKeyPem, privateKeyPem } = createKey()
      setPubKeyPem(publicKeyPem)
      setPrivateKeyPem(privateKeyPem)
      return privateKeyPem
    }
    return privateKey
  } catch(e) {
    throw(e)
  }
}

function setPrivateKeyPem(priKey) {
  const filePath = path.join(__dirname, 'private.pem')
  fs.writeFileSync(filePath, priKey)
}

function privateDecrypto(encrypto) {
  const privateKeyPem = getPrivateKeyPem()
  const privateKey = crypto.createPrivateKey(privateKeyPem)
  const encryptedData = Buffer.from(encrypto, 'base64')
  // decrypto
  const decryptedBuffer = crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  },encryptedData)
  return JSON.parse(decryptedBuffer.toString('utf-8'))
}

module.exports = {
  getPubKeyPem,
  getPrivateKeyPem,
  privateDecrypto
}