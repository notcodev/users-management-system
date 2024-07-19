import { createRequest } from '@/api/request'

export interface PostDeleteUserParams {
  id: number
}

export const postDeleteUser = createRequest(
  (api, params: PostDeleteUserParams) => {
    return api.url(`/users/delete/${params.id}`).post().json()
  },
)
