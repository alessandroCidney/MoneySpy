import { useFirestoreCrud, type DatabaseObject, type PartialDatabaseObject } from './commons/useFirestoreCrud'

export interface DatabaseUser extends DatabaseObject {
  active: true
}

export interface DataUserPrivateData extends DatabaseObject {
  email: string | null
}

interface UserCreationParams {
  baseData: PartialDatabaseObject<DatabaseUser>
  privateData: Partial<DataUserPrivateData>
}

export function useUsersCrud() {
  const firestoreCrud = useFirestoreCrud<DatabaseUser>('users')

  return {
    ...firestoreCrud,

    async registerUser(params: UserCreationParams) {
      await firestoreCrud.createIfNotExists({
        ...params.baseData,

        createdBy: params.baseData.id,
      })

      const userPrivateCrud = useFirestoreCrud<DataUserPrivateData>(`users/${params.baseData.id}/private`)

      await userPrivateCrud.createIfNotExists({
        id: 'profile',
        name: 'Dados privados do perfil',

        email: params.privateData.email || null,

        createdBy: params.baseData.id,
      })
    },
  }
}
