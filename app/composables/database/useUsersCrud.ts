import { useFirestoreCrud, type DatabaseObject, type PartialDatabaseObject } from './commons/useFirestoreCrud'

export interface DatabaseUser extends DatabaseObject {
  active: true
}

export interface DataUserPrivateData extends DatabaseObject {
  email: string | null
}

export function useUsersCrud() {
  const firestoreCrud = useFirestoreCrud<DatabaseUser>('users')

  return {
    ...firestoreCrud,

    async create(data: PartialDatabaseObject<DatabaseUser>, privateData: Partial<DataUserPrivateData>) {
      try {
        await firestoreCrud.create(data)

        const userPrivateCrud = useFirestoreCrud<DataUserPrivateData>(`users/${data.id}/private`)

        userPrivateCrud.create({
          id: 'profile',
          name: 'Dados privados do perfil',

          email: privateData.email || null,
        })
      } catch (err) {
        globalErrorHandler(err)
      }
    },
  }
}
