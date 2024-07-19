import { createRequest } from '@/api/request'

export interface PostLoginParams {
  login: string
  password: string
}

export interface PostLoginResponse {
  access_token: string
}

export const postLogin = createRequest((api, params: PostLoginParams) => {
  return api.post(params, '/login').json<PostLoginResponse>()
})
