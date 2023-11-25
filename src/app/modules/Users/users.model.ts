import { Schema, model } from 'mongoose'
import { IUser, UserMethods, UserModel } from './users.interface'

const userSchema = new Schema<IUser, UserModel, UserMethods>(
  {
    userId: {
      type: Number,
      required: [true, 'User ID is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    fullName: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required']
      },
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: {
      type: [String],
      required: [true, 'Hobbies is required'],
    },
    address: {
      street: {
        type: String,
        required: [true, 'Street is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      country: {
        type: String,
        required: [true, 'Country is required'],
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

userSchema.methods.isUserExist = async function (userId: number) {
  const existingUser = await User.findOne({ userId })
  return existingUser;
}

userSchema.methods.isUsernameExist = async function (username: string) {
  const existingUsername = await User.findOne({ username })
  return existingUsername;
}

userSchema.methods.isUserIdExist = async function (userId: number) {
  const existingUserId = await User.findOne({ userId })
  return existingUserId;
}

export const User = model<IUser, UserModel>('User', userSchema)
