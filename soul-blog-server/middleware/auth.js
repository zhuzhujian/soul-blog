// @ts-nocheck
import jwt from 'jsonwebtoken';
import { getPrivateKeyPem } from '../keys/index.js';

const secet = getPrivateKeyPem();

// 设置token过期时间
const option = {
  expiresIn: "1d", // 过期时间可以是数字（单位为秒），或者字符串（eg: '2hours'、'10s'等）
  algorithm: "PS256",
};

export function generateToken(username) {
  const payload = { username };
  return jwt.sign(payload, secet, option);
}

export function authenticateToken(req, res, next) {
  console.log(req.url)
  if (["/v1/login", "/v1/getPubKey"].includes(req.url)) {
    // 登录及获取密钥的时候不校验token
    return next();
  }

  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // 获取Bearer后面的token值
    try {
      const decoded = jwt.verify(token, secet); // 使用密钥校验
      if(decoded.exp * 1000 < Date.now()) {
        return res.status(401).json({
          message: "Unauthorization: Token Expired",
          data: null,
          code: 10036
        });
      }
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
