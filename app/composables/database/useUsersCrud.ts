import { useFirestoreCrud, type DatabaseObject, type PartialDatabaseObject } from './commons/useFirestoreCrud'

export interface DatabaseUser extends DatabaseObject {
  active: true

  firstLogin: boolean

  profilePhoto?: {
    type: 'imageUrl' | 'icon' | 'providerPhoto'
    value?: string
  }
}

export interface CompletedAchievementData {
  id: string
  completedAt: number
}

export interface DatabaseUserPrivateData extends DatabaseObject {
  email: string | null

  achievements: {
    complete: CompletedAchievementData[]

    inProgressPayload: {
      lastLoginValidationTime: number
      loginSequenceCounter: number
    }
  }
}

interface UserCreationParams {
  baseData: PartialDatabaseObject<DatabaseUser>
  privateData: Partial<DatabaseUserPrivateData>
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

      const userPrivateCrud = useFirestoreCrud<DatabaseUserPrivateData>(`users/${params.baseData.id}/private`)

      await userPrivateCrud.createIfNotExists({
        id: 'profile',
        name: 'Dados privados do perfil',

        email: params.privateData.email || null,

        createdBy: params.baseData.id,

        achievements: {
          complete: [
            { id: 'beginner', completedAt: getCurrentUnixTime() },
          ],

          inProgressPayload: {
            lastLoginValidationTime: getCurrentUnixTime(),
            loginSequenceCounter: 1,
          },
        },
      })
    },

    getPrivateProfileData(userId: string) {
      const userPrivateCrud = useFirestoreCrud<DatabaseUserPrivateData>(`users/${userId}/private`)

      return userPrivateCrud.get('profile')
    },

    updatePrivateProfileData(userId: string, data: Parameters<ReturnType<typeof useFirestoreCrud<DatabaseUserPrivateData>>['update']>[0]) {
      const userPrivateCrud = useFirestoreCrud<DatabaseUserPrivateData>(`users/${userId}/private`)

      return userPrivateCrud.update(data)
    },
  }
}
