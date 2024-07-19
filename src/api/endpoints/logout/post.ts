import { createRequest } from '@/api/request'

export const postLogout = createRequest((api) => {
  return api.url('/logout').get().json()
})
