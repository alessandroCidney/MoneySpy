export function globalErrorHandler(err: unknown) {
  console.error(err)
}

export class ApplicationError extends Error {
  status!: number

  constructor(message: string, status: number) {
    super(message)

    this.status = status
  }
}
