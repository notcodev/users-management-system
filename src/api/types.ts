export interface UserDto {
  id: number
  name: string
  surname: string
  login: string
  roles: string[]
  updated_at: string
  created_at: string
}

export interface RoleDto {
  type: number
  name: string
  description: null
  ruleName: null
  data: null
  createdAt: number
  updatedAt: number
}
