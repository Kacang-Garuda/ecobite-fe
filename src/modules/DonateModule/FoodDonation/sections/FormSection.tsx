import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { foodDonationSchema } from '../../schema/FoodDonation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Link } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { categoryType } from '../../interface'
import DialogConfirmation from '../../module-elements/DialogConfirmation'

const FormSection = ({ category }: { category: categoryType }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] =
    useState(false)
  const [fileName, setFileName] = useState('')
  const [listInstitutionEmail, setListInstitutionEmail] = useState<
    { email: string }[]
  >([])

  const router = useRouter()

  const form = useForm<z.infer<typeof foodDonationSchema>>({
    resolver: zodResolver(foodDonationSchema),
    defaultValues: {
      title: '',
      description: '',
      recipientEmail: 'ALL',
      category: category,
      imageUrl: null,
      quantity: 0,
      expiredDate: undefined,
      instruction: '',
      location: '',
    },
  })

  const { isValid } = form.formState

  async function onSubmit(values: z.infer<typeof foodDonationSchema>) {
    setIsLoading(true)

    const imageBase64 = await convertFileToBase64(values.imageUrl)

    const updatedData = {
      ...values,
      imageUrl: imageBase64,
      isInstitution: values.recipientEmail === 'ALL' ? false : true,
      category,
    }

    try {
      const token = Cookies.get('token')
      if (token) {
        await axios.post(
          'http://localhost:3001/api/food-donation',
          updatedData,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        router.replace('/donate')
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false)
    }
  }

  const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setFileName(file.name)
      form.setValue('imageUrl', file)
    }
  }

  async function getAllInstitution() {
    const token = Cookies.get('token')

    if (token) {
      const response = await axios.get(
        'http://localhost:3001/api/food-donation/institution',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data) {
        setListInstitutionEmail(response.data.data)
      }
    }
  }

  useEffect(() => {
    getAllInstitution()
  }, [])

  return (
    <section className="w-full">
      <DialogConfirmation
        open={isOpenConfirmationDialog}
        setOpen={setIsOpenConfirmationDialog}
        isLoading={isLoading}
        handleConfirm={form.handleSubmit(onSubmit)}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Your Food Condition</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <label
                      htmlFor="file-upload-qris"
                      className="flex items-center justify-center w-2/5 py-4 border-dashed border-2 border-[#188290] text-[#188290] rounded-md cursor-pointer"
                    >
                      <img
                        src="/images/authentication/upload-icon.svg"
                        alt="Upload Icon"
                        className="mr-2"
                      />
                      <span
                        className={fileName ? 'text-black' : 'text-[#188290]'}
                      >
                        {fileName || 'Browse Files'}
                      </span>
                      <input
                        id="file-upload-qris"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </FormControl>
                <FormDescription className="text-black">
                  <p>File supported: .png, .jpg</p>
                  <p className="font-bold text-[#EB5757]">What to include:</p>
                  <p>1. Close-up of the expiration date</p>
                  <p>2. Packaging condition</p>
                  <p>3. Any labels or ingredient lists</p>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the food recipient" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ALL">Everyone</SelectItem>
                    {listInstitutionEmail.map((value) => (
                      <SelectItem key={value.email} value={value.email}>
                        {value.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the name of the food item"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the amount of the food item"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full p-4 border border-[#188290] rounded-[8px]"
                    placeholder="Describe the food item (e.g., ingredients, allergens)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiredDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expired Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown-buttons"
                      mode="single"
                      fromYear={2020}
                      toYear={2100}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date('2020-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instruction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Instruction</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full p-4 border border-[#188290] rounded-[8px]"
                    placeholder="Provide any special instructions for pickup"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <Input placeholder="Google Maps link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center items-center">
            <button
              type="button"
              className={`px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
              disabled={isLoading}
              onClick={() =>
                setIsOpenConfirmationDialog(isValid ? true : false)
              }
            >
              Confirm
            </button>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default FormSection
