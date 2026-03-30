import { getPubKey } from "@/api"
import JSEncrypt from "jsencrypt";

export function getPrivateStorage() {
  return localStorage.getItem('soul_blog_rsa_key');
}

export async function setPrivateStorage(data: any) {
  localStorage.setItem('soul_blog_rsa_key', JSON.stringify(data));
}

export async function getRsaKey() {
  let secretKey = getPrivateStorage() || '';
  if(['', undefined, null].includes(secretKey)) {
    try {
      const res = await getPubKey();
      if(res.code !== 200) {
        throw new Error('获取密钥失败！');
      }
      secretKey = res.data.pub_key;
    } catch(e) {
      window.$message.error(e);
    }
  }
  return secretKey;
}

export async function encryptParam(param: any) {
  const key = await getRsaKey();
  const encrypter = new JSEncrypt();
  encrypter.setPublicKey(key);
  return encrypter.encrypt(JSON.stringify(param))
}