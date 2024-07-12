'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '@/modules/AuthenticationModule/context/Authentication'

const MAX_FILE_SIZE = 50000000
const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

const individualSchema = z.object({
  profileImage: z
    .any()
    .refine((file) => file !== null, { message: 'Please select a file' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 50MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg and .png formats are supported.'
    ),
  name: z.string().min(1, { message: 'Please enter a valid input' }),
  phone: z
    .string()
    .min(1, { message: 'Please enter a valid input' })
    .max(20, { message: 'Please enter a valid input' }),
})

const EditProfileIndividualPage = () => {
  const [profileShow, setProfileShow] = useState<string | null>(null)
  const { user, setUser } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof individualSchema>>({
    resolver: zodResolver(individualSchema),
    defaultValues: {
      profileImage: null,
      name: user?.name,
      phone: user?.phone,
    },
  })

  useEffect(() => {
    if (user?.profileImage) {
      const convertBase64ToFile = (base64: string, fileName: string) => {
        const arr = base64.split(',')
        if (arr.length < 2) {
          throw new Error('Invalid base64 string')
        }
        const mimeMatch = arr[0].match(/:(.*?);/)
        const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream'
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], fileName, { type: mime })
      }

      try {
        const imageFile = convertBase64ToFile(user.profileImage, 'profileImage.jpg')
        setProfileShow(user.profileImage)
        form.reset({
          profileImage: imageFile,
          name: user?.name,
          phone: user?.phone,
        })
      } catch (error) {
        console.error('Error converting base64 to file:', error)
      }
    } else {
      form.reset({
        profileImage: null,
        name: user?.name,
        phone: user?.phone,
      })
    }
  }, [user, form])

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof individualSchema>) => {
    const token = Cookies.get('token')
    if (token) {
      try {
        setLoading(true)

        const reader = new FileReader()
        reader.onloadend = async () => {
          const base64String = reader.result as string
          const updatedData = {
            ...data,
            profileImage: base64String,
          }

          try {
            const response = await axios.patch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/`,
              updatedData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            setUser(response.data.data)
          } catch (error) {
            console.error(error)
          } finally {
            setLoading(false)
            router.push('/')
          }
        }

        reader.readAsDataURL(data.profileImage)
      } catch (error: any) {
        console.error('Error processing form', error)
        setLoading(false)
      }
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      form.setValue('profileImage', file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileShow(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col relative w-full">
      <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-40 py-8 font-bold">
        <div className="w-full flex flex-row justify-center relative py-4">
          <div className="flex justify-center items-center pt-4">
            <p className="text-3xl text-[#02353C]">Edit Profile</p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full gap-6 flex flex-col font-normal"
          >
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333] flex justify-center">
                    Profile Image
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full flex justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative p-3 flex items-center justify-center w-40 h-40 bg-[#F8F8F8] text-[#188290] rounded-full cursor-pointer"
                      >
                        <div className="bg-[#1882901C] w-full h-full rounded-full items-center flex justify-center">
                          {profileShow ? (
                            <img
                              src={profileShow}
                              alt="Profile"
                              className="absolute inset-0 w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <img
                              src="/images/authentication/user-icon.svg"
                              alt="Upload Icon"
                              className="w-12 h-12"
                            />
                          )}
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                        <div className="absolute flex justify-center items-center w-12 h-12 rounded-[1.125rem] bg-[#F8F8F8] bottom-0 right-0">
                          <img
                            src="/images/authentication/cam-icon.svg"
                            alt="Upload Icon"
                            className="w-8 h-8"
                          />
                        </div>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333] w-full">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333] w-full">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className={`mt-10 px-10 py-4 w-max flex self-center font-semibold text-white rounded-lg ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-[#188290] hover:bg-[#02353C]'
              }`}
              disabled={loading}
            >
              {loading ? 'Saving Your Update...' : 'Save'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditProfileIndividualPage
