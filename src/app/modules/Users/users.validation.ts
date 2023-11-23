import Joi from 'joi';
import { IUser } from './users.interface';

export const userValidationSchema = Joi.object<IUser>({
  userId: Joi.number().required(),
  username: Joi.string().trim().min(3).max(30).required(),
  password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  orders: Joi.array().items(
    Joi.object({
      productName: Joi.string(),
      price: Joi.number(),
      quantity: Joi.number(),
    })
  ),
});

export default userValidationSchema;