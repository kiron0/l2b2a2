import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  success: boolean
  message: string
  error: IGenericErrorMessage[]
}
