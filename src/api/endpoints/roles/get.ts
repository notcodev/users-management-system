import { createRequest } from '@/api/request'
import { RoleDto } from '@/api/types'

export type GetListRolesResponse = {
  role: RoleDto
  children: Record<string, RoleDto>
}[]

export const getListRoles = createRequest((api) => {
  return api.get('/roles').json<GetListRolesResponse>()
})
