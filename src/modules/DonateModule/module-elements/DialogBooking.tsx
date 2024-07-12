import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { bookingFoodSchema } from '../schema/BookingFood'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const DialogBooking = ({
  open,
  setOpen,
  donationId,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  donationId: string
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof bookingFoodSchema>>({
    resolver: zodResolver(bookingFoodSchema),
    defaultValues: {
      quantity: 0,
      notes: '',
    },
  })

  async function onSubmit(values: z.infer<typeof bookingFoodSchema>) {
    setIsLoading(true)

    try {
      const token = Cookies.get('token')
      if (token) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/food-donation/book/${donationId}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        if (response.data.success) {
          toast.success(response.data.message)
          router.replace('/donate')
        }
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="w-max"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full px-4 py-2 border border-[#188290] rounded-[8px]"
                        placeholder="Add any specific instructions or requests here"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className={`px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg
                ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Confirm'
                )}
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBooking
