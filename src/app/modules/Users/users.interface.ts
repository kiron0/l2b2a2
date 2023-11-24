import { Model } from "mongoose"

export type IProduct = {
  productName: string
  price: number
  quantity: number
}[]

export type IUser = {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  orders: IProduct
}

export type UserMethods = {
  isUserExist: (userId: number) => Promise<IUser | null>
}

export type UserModel = Model<IUser, Record<string, never>, UserMethods>