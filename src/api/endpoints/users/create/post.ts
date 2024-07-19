import { createRequest } from '@/api/request'
import { UserDto } from '@/api/types'

export interface PostCreateUserParams {
  name: string
  surname: string
  login: string
  password: string
}

export interface PostCreateUserResponse {
  message: string
  user: UserDto
}

export const postCreateUser = createRequest(
  (api, params: PostCreateUserParams) => {
    return api.post(params, '/users/create').json<PostCreateUserResponse>()
  },
)
