import { Request, Response } from 'express'
import { IProduct, IUser } from './users.interface'
import {
  addNewOrderService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  signUpService,
  updateUserService,
  getAllOrderService,
} from './users.service'
import userValidationSchema from './users.validation'

export const signUpController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user: IUser = req.body

    const { error, value } = userValidationSchema.validate(user)

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message || 'Bad request',
        error: {
          code: 400,
          description: error.message || 'Bad request',
        },
      })
    } else {
      const result = await signUpService(value);

      if (!result.userId) {
        res.status(400).json({
          success: false,
          message: result.message,
          error: {
            code: 400,
            description: result.message,
          },
        })
      } else {
        res.status(201).json({
          success: true,
          message: 'User created successfully!',
          data: result,
        })
      }
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      error: {
        code: 500,
        description: (err as Error).message,
      },
    })
  }
}

export const getAllUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await getAllUsersService()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      error: {
        code: 404,
        description: (err as Error).message,
      },
    })
  }
}

export const getUserByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params

    const isMatchUser = await getUserByIdService(userId)

    if (!isMatchUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: isMatchUser,
      })
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      error: {
        code: 404,
        description: (err as Error).message,
      },
    })
  }
}

export const updateUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params
    const user: IUser = req.body

    const isMatchUser = await getUserByIdService(userId)

    const { error, value } = userValidationSchema.validate(user)

    if (!isMatchUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else if (isMatchUser.userId !== user.userId) {
      res.status(400).json({
        success: false,
        message: 'User id already exist',
        error: {
          code: 400,
          description: 'User id already exist',
        },
      })
    } else {
      const result = await updateUserService(userId, value);

      if (!result.userId) {
        res.status(400).json({
          success: false,
          message: result.message,
          error: {
            code: 400,
            description: result.message,
          },
        })
      } else {
        res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: result,
        })
      }
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      error: {
        code: 404,
        description: (err as Error).message,
      },
    })
  }
}

export const deleteUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params

    const isMatchUser = await getUserByIdService(userId)

    if (!isMatchUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      const result = await deleteUserService(userId)

      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      })
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      error: {
        code: 404,
        description: (err as Error).message,
      },
    })
  }
}

export const addNewProductController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params
    const { productName, price, quantity } = req.body

    const order = [
      {
        productName,
        price,
        quantity,
      },
    ] as IProduct

    const isMatchUser = await getUserByIdService(userId)

    if (!isMatchUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      const result = await addNewOrderService(userId, order)

      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      })
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      error: {
        code: 404,
        description: (err as Error).message,
      },
    })
  }
}

export const getAllOrderController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params

    const isMatchUser = await getUserByIdService(userId)

    if (!isMatchUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      const result = await getAllOrderService(userId)

      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      })
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      error: {
        code: 404,
        description: (err as Error).message,
      },
    })
  }
}

export const getTotalPriceController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params

    const isMatchUser = await getUserByIdService(userId)

    if (!isMatchUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      const result = await getAllOrderService(userId)

      let totalPrice = 0

      result.orders.forEach((order: any) => {
        totalPrice = Math.round((totalPrice + order.price * order.quantity) * 100) / 100
      })

      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice,
        },
      })
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
      error: {
        code: 404,
        description: (err as Error).message,
      },
    })
  }
}
