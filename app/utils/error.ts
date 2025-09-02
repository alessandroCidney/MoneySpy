export function globalErrorHandler(err: unknown) {
  console.error(err)
}

export const APP_ERROR_CODES = {
  CRUD_OPERATIONS: {
    DOCUMENT_ALREADY_EXISTS: 'Document already exists',
    DOCUMENT_NOT_FOUND: 'Document not found',
  },

  GENERIC_ERRORS: {
    UNIDENTIFIED_ERROR: 'Unidentified error',
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
