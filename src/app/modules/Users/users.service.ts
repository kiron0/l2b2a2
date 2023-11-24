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

    const { password, ...rest } = result.toObject()
    return rest
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getAllUsersService = async (): Promise<any> => {
  try {
    const result = await User.find({}, { password: 0 })
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
    const result = await User.findOne({ userId }).select('-password')
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
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    const user = new User(userData)

    if (!(await user.isUserExist(userId as unknown as number))) {
      throw new Error('User not found!')
    }

    const result = await User.findOneAndUpdate(
      { userId },
      {
        ...userData,
        userId,
        password: hashedPassword,
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

    await User.findOneAndDelete({ userId })
    return null
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
