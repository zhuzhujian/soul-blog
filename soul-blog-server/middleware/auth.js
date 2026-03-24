// @ts-nocheck
const jwt = require("jsonwebtoken");
const { getPrivateKeyPem } = require("../keys");

const secet = getPrivateKeyPem();

// 设置token过期时间
const option = {
  expiresIn: "1d", // 过期时间可以是数字（单位为秒），或者字符串（eg: '2hours'、'10s'等）
  algorithm: "PS256",
};

function generateToken(user) {
  const payload = { username: user.username };
  return jwt.sign(payload, secet, option);
}

function authenticateToken(req, res, next) {
  if (["/login", "/getPubKye"].includes(req.url)) {
    // 登录及获取密钥的时候不校验token
    next();
  }
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // 获取Bearer后面的token值
    try {
      const decode = jwt.verify(token, secet); // 使用密钥校验
      res.user = decoded;
      next();
    } catch (e) {
      return res
        .status(401)
        .json({ message: "Unauthorization: Invalid Token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthrization: No Token Provide" });
  }
}

module.exports = {
  generateToken,
  authenticateToken,
};
