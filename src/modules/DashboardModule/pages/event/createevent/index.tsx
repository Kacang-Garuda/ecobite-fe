'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import DatePickerDemo from '@/components/elements/DashboardElements/DatePicker'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const MAX_FILE_SIZE = 50000000
const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

const eventSchema = z.object({
  title: z.string().min(1, { message: 'Please enter a valid input' }),
  date: z.date(),
  city: z.string().min(1, { message: 'Please select a city' }),
  location: z.string().min(1, { message: 'Please enter a valid input' }),
  description: z.string().min(5, { message: 'Please enter a valid input' }),
  jobDescription: z.string().min(5, { message: 'Please enter a valid input' }),
  benefit: z.string().min(5, { message: 'Please enter a valid input' }),
  image: z
    .any()
    .refine((file) => file !== null, { message: 'Please select a file' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, { message: 'Max image size is 50MB.' })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), { message: 'Only .jpg and .png formats are supported.' }),
})

const CreateEvent = () => {
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [coverPhotoName, setCoverPhotoName] = useState<string | null>(null)
  const route = useRouter();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      city: '',
      location: '',
      description: '',
      jobDescription: '',
      benefit: '',
      image: null,
    },
  })

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]))
      setCoverPhotoName(e.target.files[0].name)
      form.setValue('image', e.target.files[0])
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

  const onSubmit = async (data: z.infer<typeof eventSchema>) => {
    setLoading(true)
    const token = Cookies.get('token')
    if(token) {
        try {
          const coverPhotoBase64 = await convertFileToBase64(data.image)
    
          const updatedData = {
            ...data,
            image: coverPhotoBase64,
          }
    
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/event`,updatedData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          if(response.data.success) {
            route.push('/')
          }
        } catch (error) {
          console.error('Error submitting form', error)
        } finally {
          setLoading(false)
        }
    }
  }

  return (
    <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-16 py-6 font-bold">
      <div className="w-full flex flex-col justify-center relative py-4">
        <div className="flex justify-center items-center">
          <p className="text-3xl text-[#02353C]">Create Event</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full gap-6 flex flex-col font-normal"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">Event Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter the name of the event" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333] flex flex-col">Date</FormLabel>
                  <FormControl>
                    <DatePickerDemo value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333] flex flex-col">City</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => form.setValue('city', value)}
                    >
                      <SelectTrigger className="w-3/5 p-2 ">
                        <SelectValue placeholder="Enter city of the event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                        <SelectItem value="Bandung">Bandung</SelectItem>
                        <SelectItem value="Bogor">Bogor</SelectItem>
                        <SelectItem value="Surabaya">Surabaya</SelectItem>
                        <SelectItem value="Medan">Medan</SelectItem>
                        <SelectItem value="Bali">Bali</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <FormLabel className="text-[#333]">Location Details</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Provide a detailed location of the event using Google Maps link" />
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
                  <FormLabel className="text-[#333]">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      {...field}
                      className="w-full"
                      placeholder="Provide a detailed description of the event, including its purpose and goals"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      {...field}
                      className="w-full"
                      placeholder="Describe the tasks and responsibilities for volunteers"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">Benefits</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      {...field}
                      className="w-full"
                      placeholder="List the benefits volunteers will get"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">
                    Cover Photo
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <label
                        htmlFor="file-upload-image"
                        className="flex items-center justify-center w-2/5 py-4 border-dashed border-2 border-[#188290] text-[#188290] rounded-md cursor-pointer"
                      >
                        <img
                          src="/images/authentication/upload-icon.svg"
                          alt="Upload Icon"
                          className="mr-2"
                        />
                        <span
                          className={
                            coverPhotoName ? 'text-black' : 'text-[#188290]'
                          }
                        >
                          {coverPhotoName || 'Upload your cover photo'}
                        </span>
                        <input
                          id="file-upload-image"
                          type="file"
                          accept="image/*"
                          onChange={handleProfileFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center pt-4">
              <Button type="submit" disabled={loading} className="px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg bg-[#188290] hover:bg-[#02353C]">
                {loading ? 'Creating Event...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateEvent