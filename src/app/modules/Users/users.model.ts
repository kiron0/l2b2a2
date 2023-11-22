import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    hobbies: {
      type: [String],
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
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
