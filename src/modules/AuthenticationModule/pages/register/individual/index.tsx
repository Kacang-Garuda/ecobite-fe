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
import { useAuth } from '../../../context/Authentication'

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
  email: z.string().min(1, { message: 'Please enter a valid input' }).email(),
  password: z.string().min(1, { message: 'Please enter a valid input' }),
  name: z.string().min(1, { message: 'Please enter a valid input' }),
  phone: z
    .string()
    .min(1, { message: 'Please enter a valid input' })
    .max(20, { message: 'Please enter a valid input' }),
  isInstitution: z.boolean(),
})

interface RegisterIndividualProps {
  onBack: () => void
}

const RegisterIndividual: React.FC<RegisterIndividualProps> = ({ onBack }) => {
  const { setUser, isLoggedIn } = useAuth()
  const [profileShow, setProfileShow] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof individualSchema>>({
    resolver: zodResolver(individualSchema),
    defaultValues: {
      profileImage: null,
      email: '',
      password: '',
      name: '',
      phone: '',
      isInstitution: false,
    },
  })

  useEffect(() => {
    const token = Cookies.get('token')
    if (token && isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  const onSubmit = async (data: z.infer<typeof individualSchema>) => {
    try {
      setLoading(true)
      setErrorMessage('')
      console.log('Loading set to true')

      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result as string
        const updatedData = {
          ...data,
          profileImage: base64String,
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
            updatedData,
            {}
          )
          const { token, user } = response.data.data

          Cookies.set('token', token)
          setUser(user)

          if (response.data.code === 201) {
            const sendVerification = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-email-verification`,
              user,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            if (sendVerification.data.code === 200) {
              router.push('/verification')
            }
          }
        } catch (error: any) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.code === 400
          ) {
            setErrorMessage('Email Already Used')
          } else {
            console.error('Error submitting form', error)
          }
        } finally {
          setLoading(false)
          console.log('Loading set to false')
        }
      }

      reader.readAsDataURL(data.profileImage)
    } catch (error: any) {
      console.error('Error processing form', error)
      setLoading(false)
      console.log('Loading set to false')
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className="flex flex-col relative w-full">
      <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-40 py-20 font-bold">
        <div className="w-full flex flex-row justify-center relative py-12">
          <div className="absolute left-0">
            <button
              className="hover:scale-110 transition ease-in-out"
              onClick={onBack}
            >
              <img
                src="/images/authentication/arrow-left.svg"
                alt="Arrow Left"
              />
            </button>
          </div>
          <div className="flex justify-center items-center pt-4">
            <p className="text-3xl text-[#02353C]">Sign Up as an Individual</p>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        className="pl-10"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm leading-5"
                      >
                        <img
                          src={
                            showPassword
                              ? '/images/authentication/eye-fill.svg'
                              : '/images/authentication/eye-slash-fill.svg'
                          }
                          alt={showPassword ? 'Hide password' : 'Show password'}
                          className="w-3/4"
                        />
                      </button>
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
                  <FormLabel className="text-[#333]">Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your full name" />
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
                  <FormLabel className="text-[#333]">Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && (
              <p className="text-red-600 text-center mt-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className={`px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
              disabled={loading}
            >
              {loading ? 'Creating Your Account...' : 'Create Your Account'}
            </button>
          </form>
        </Form>
        <div className="w-full flex justify-center pt-6">
          <p className="text-black font-semibold">
            Already have an account?&nbsp;
            <a className="text-[#188290] hover:text-[#02353C]" href="/login">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterIndividual
