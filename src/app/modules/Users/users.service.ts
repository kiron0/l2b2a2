import bcrypt from 'bcrypt'
import { User } from './users.model'
import { IProduct, IUser } from './users.interface'

export const signUpService = async (userData: IUser): Promise<any> => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    const user = new User(userData)

    if (await user.isUserExist(userData.userId)) {
      throw new Error('User already exist!')
    }

    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    })

    const result = await newUser.save()

    const { password, _id, ...rest } = result.toObject()
    return rest
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getAllUsersService = async (requestedFields: string[]): Promise<any> => {
  try {
    const defaultFields: string[] = ['username', 'fullName', 'age', 'email', 'address'];

    const result = await User.aggregate([
      {
        $project: requestedFields.reduce((acc: any, field: string): object => {
          if (requestedFields.length === 1 && field === 'password') {
            return defaultFields.reduce((acc: any, field: string): object => {
              acc[field] = `$${field}`
              return acc;
            }, { _id: 0 })
          }
          if (field === 'password') {
            return acc;
          }
          if (!defaultFields.includes(field)) {
            throw new Error('Invalid field!')
          }
          acc[field] = `$${field}`
          return acc;
        }, { _id: 0 }),
      },
    ])

    return result
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getUserByIdService = async (userId: string): Promise<any> => {
  try {
    const result = await User.findOne({ userId }).select('-password -_id -orders')
    return result
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const updateUserService = async (
  userId: string,
  userData: IUser,
): Promise<any> => {
  try {
    const { password, orders, ...rest } = userData

    const user = new User(userData)

    const existingUser = await user.isUserExist(userId as unknown as number)

    if (!existingUser) {
      throw new Error('User not found!')
    }

    if (existingUser.username !== userData.username) {
      const isUsernameExist = await user.isUsernameExist(userData.username)
      if (isUsernameExist) {
        throw new Error('Username already taken!')
      }
    }

    if (existingUser.userId !== userData.userId) {
      const isUserIdExist = await user.isUserIdExist(userData.userId)
      if (isUserIdExist) {
        throw new Error('User ID already taken!')
      }
    }

    const result = await User.findOneAndUpdate(
      { userId },
      {
        ...rest,
      },
      { new: true },
    ).select('-password')

    return result
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const deleteUserService = async (userId: string): Promise<any> => {
  try {

    const user = new User()

    if (!(await user.isUserExist(userId as unknown as number))) {
      throw new Error('User not found!')
    }

    const result = await User.findOneAndDelete({ userId })
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const addNewOrderService = async (
  userId: string,
  order: IProduct,
): Promise<any> => {
  try {

    const user = new User(order)

    if (!(await user.isUserExist(userId as unknown as number))) {
      throw new Error('User not found!')
    }

    const result = await User.findOneAndUpdate(
      { userId },
      {
        $push: {
          orders: order,
        },
      },
      { new: true },
    )

    return result
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getAllOrderService = async (userId: string): Promise<any> => {
  try {

    const user = new User()

    if (!(await user.isUserExist(userId as unknown as number))) {
      throw new Error('User not found!')
    }

    const result = await User.findOne({ userId }, { orders: 1, _id: 0 })

    return result
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getTotalPriceService = async (userId: string): Promise<any> => {
  try {
    const user = new User()

    if (!(await user.isUserExist(userId as unknown as number))) {
      throw new Error('User not found!')
    }

    const result = await User.aggregate([
      { $match: { userId: parseInt(userId) } },
      { $unwind: '$orders' },
      {
        $group: {
          _id: '$userId',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      { $project: { _id: 0 } },
    ])

    const totalPrice = Number(result[0].totalPrice.toFixed(2))

    return { totalPrice }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}
