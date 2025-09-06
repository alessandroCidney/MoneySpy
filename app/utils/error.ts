import { FirebaseError } from 'firebase/app'
import type { AuthErrorCodes } from 'firebase/auth'

export const APP_ERROR_CODES = {
  CRUD_OPERATIONS: {
    DOCUMENT_ALREADY_EXISTS: 'Document already exists',
    DOCUMENT_NOT_FOUND: 'Document not found',
  },

  GENERIC_ERRORS: {
    UNIDENTIFIED_ERROR: 'Unidentified error',
  },

  DEFAULT_ERRORS: {
    METHOD_NOT_ALLOWED: 'Method or operation not allowed',
    BAD_REQUEST: 'Bad request',
  },
}

interface AplicationErrorConstructorParams {
  message?: string
  status: number
  code: string
}

export class ApplicationError extends Error {
  status!: number
  code!: string

  constructor(params: AplicationErrorConstructorParams) {
    super(params.message ?? params.code)

    this.status = params.status
    this.code = params.code
  }
}

const FIREBASE_ERROR_MESSAGES: Partial<Record<ValueOf<typeof AuthErrorCodes>, string>> & Record<FirebaseError['code'], string> = {
  'auth/popup-closed-by-user': 'O popup de autenticação foi fechado',
  'auth/wrong-password': 'E-mail ou senha incorretos',
  'auth/invalid-email': 'E-mail ou senha incorretos',
  'auth/user-not-found': 'E-mail ou senha incorretos',
  'auth/email-already-in-use': 'O e-mail já está sendo utilizado',
  'auth/invalid-credential': 'E-mail ou senha incorretos',
}

export function globalErrorHandler(err: unknown) {
  const messageStore = useMessageStore()

  if (err instanceof FirebaseError) {
    return messageStore.showErrorMessage({
      text: FIREBASE_ERROR_MESSAGES[err.code] ?? APP_ERROR_CODES.GENERIC_ERRORS.UNIDENTIFIED_ERROR,
    })
  }

  if (err instanceof ApplicationError) {
    // TODO: Implement details dialog
    return messageStore.showErrorMessage({ text: err.message })
  }

  if (err instanceof Error) {
    return messageStore.showErrorMessage({ text: err.message })
  }
}
