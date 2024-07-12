'use client'

import { z } from 'zod'

export const bookingFoodSchema = z.object({
  quantity: z.number().nonnegative().min(1),
  notes: z.string().min(1, { message: 'Please enter a valid input' }),
})
