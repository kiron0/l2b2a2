class ApiError extends Error {
  success: boolean
  constructor(success: boolean, message: string | undefined, error = '') {
    super(message)
    this.success = success
    if (error) {
      this.stack = error
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export { ApiError }
