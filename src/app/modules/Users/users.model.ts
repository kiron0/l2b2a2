import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: Number,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    fullName: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    hobbies: {
      type: [String],
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    orders: {
      type: [
        {
          productName: {
            type: String,
          },
          price: {
            type: Number,
          },
          quantity: {
            type: Number,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const User: Model<IUser> = model('User', userSchema)
