import express, { Router } from 'express'
import {
  getAllUsersController,
  getUserByIdController,
  signUpController,
  updateUserController,
  deleteUserController,
  addNewOrderController,
  getAllOrderController,
  getTotalPriceController,
} from './users.controller'

const router: Router = express.Router()

router.post('/', signUpController)
router.get('/', getAllUsersController)
router.get('/:userId', getUserByIdController)
router.put('/:userId', updateUserController)
router.delete('/:userId', deleteUserController)
router.put('/:userId/orders', addNewOrderController)
router.get('/:userId/orders', getAllOrderController)
router.get('/:userId/orders/total-price', getTotalPriceController)

export const userRoutes = router
