import { z, ZodError } from 'zod'

export const UserZodSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string().trim(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email().trim(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(
    z.object({
      productName: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
  ),
})

export function validateUser(user: any) {
  try {
    UserZodSchema.parse(user)
    return { success: true }
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.errors }
    }
    throw error
  }
}
