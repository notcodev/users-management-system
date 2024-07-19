import { createRequest } from '@/api/request'
import { UserDto } from '@/api/types'

export type GetProfileResponse = UserDto

export const getProfile = createRequest((api) => {
  return api.get('/profile').json<GetProfileResponse>()
})
