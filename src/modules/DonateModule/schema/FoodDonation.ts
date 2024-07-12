'use client'

import { z } from 'zod'

const MAX_FILE_SIZE = 50000000
const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

export const foodDonationSchema = z.object({
  title: z.string().min(1, { message: 'Please enter a valid input' }),
  description: z.string().min(1, { message: 'Please enter a valid input' }),
  recipientEmail: z.string().min(1, { message: 'Please enter a valid input' }),
  category: z.string().min(1, { message: 'Please enter a valid input' }),
  imageUrl: z
    .any()
    .refine((file) => file !== null, { message: 'Please select a file' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 50MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg and .png formats are supported.'
    ),
  quantity: z.number().nonnegative().min(1),
  expiredDate: z.date(),
  instruction: z.string().min(1, { message: 'Please enter a valid input' }),
  location: z.string().min(1, { message: 'Please enter a valid input' }),
})
