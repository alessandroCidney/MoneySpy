import { useFirestoreCrud, type DatabaseObject } from './commons/useFirestoreCrud'

export interface DatabaseUser extends DatabaseObject {
  active: true
}

export function useUsersCrud() {
  return useFirestoreCrud<DatabaseUser>('users')
}
