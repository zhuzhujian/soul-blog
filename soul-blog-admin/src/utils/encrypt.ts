import { JSEncrypt } from "jsencrypt";
import { getRsaKey } from '@/utils'

export async function encrypt(context: any) {
  const key = await getRsaKey();
  const encrypter = new JSEncrypt();
  encrypter.setPrivateKey(key);
  const encrypt = encrypter.encrypt(JSON.stringify(context));
  console.log(encrypter, typeof encrypter, encrypt);
  return encrypt
}
