import { useFirestoreCrud, type BaseObject } from './useFirestoreCrud'

export interface UserObject extends BaseObject {
  active: true
}

export function useUsersCrud() {
  return useFirestoreCrud<UserObject>('users')
}
