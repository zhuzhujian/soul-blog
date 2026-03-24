import fetch from "@/utils/server";
import type { IAuthToken, UserInfo } from "@/types/auth";
import type { IResult } from '@/types/common'

export async function login(userInfo: UserInfo):Promise<IResult<IAuthToken>> {
  return fetch.post('/api/v1/login', userInfo)
}