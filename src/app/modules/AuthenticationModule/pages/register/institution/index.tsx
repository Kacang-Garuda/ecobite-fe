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
import { Textarea } from '@/components/ui/textarea'

const MAX_FILE_SIZE = 50000000
const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

const institutionSchema = z.object({
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
  description: z.string().min(5, { message: 'Please enter a valid input' }),
  qris: z
    .any()
    .refine((file) => file !== null, { message: 'Please select a file' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 50MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg and .png formats are supported.'
    ),
  isInstitution: z.boolean(),
})

interface RegisterInstitutionProps {
  onBack: () => void
}

const RegisterInstitution: React.FC<RegisterInstitutionProps> = ({
  onBack,
}) => {
  const { setUser, isLoggedIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [profileFileName, setProfileFileName] = useState('')
  const [qrisFileName, setQrisFileName] = useState('')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const form = useForm<z.infer<typeof institutionSchema>>({
    resolver: zodResolver(institutionSchema),
    defaultValues: {
      profileImage: null,
      email: '',
      password: '',
      name: '',
      phone: '',
      description: '',
      qris: null,
      isInstitution: true,
    },
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token && isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const onSubmit = async (data: z.infer<typeof institutionSchema>) => {
    try {
      setLoading(true)
      setErrorMessage('')

      const profileImageBase64 = await convertFileToBase64(data.profileImage)
      const qrisBase64 = await convertFileToBase64(data.qris)

      const updatedData = {
        ...data,
        profileImage: profileImageBase64,
        qris: qrisBase64,
      }

      try {
        const response = await axios.post(
          'http://localhost:3001/api/auth/register',
          updatedData,
          {}
        )
        const { token, user } = response.data.data

        Cookies.set('token', token)
        setUser(user)

        if (response.data.code === 201) {
          await axios.post(
            'http://localhost:3001/api/auth/send-email-verification',
            user,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          router.push('/verification')
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
      }
    } catch (error) {
      console.error('Error submitting form', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleProfileFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setProfileFileName(file.name)
      form.setValue('profileImage', file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleQrisFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setQrisFileName(file.name)
      form.setValue('qris', file)
    }
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
            <p className="text-3xl text-[#02353C]">Sign Up as an Institution</p>
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
                        htmlFor="file-upload-profile"
                        className="relative p-3 flex items-center justify-center w-40 h-40 bg-[#F8F8F8] text-[#188290] rounded-full cursor-pointer"
                      >
                        <div className="bg-[#1882901C] w-full h-full rounded-full items-center flex justify-center">
                          {profileImage ? (
                            <img
                              src={profileImage}
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
                            id="file-upload-profile"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileFileChange}
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
                  <FormLabel className="text-[#333]">
                    Organization Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your organization name"
                    />
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">
                    Organization Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      {...field}
                      className="w-full"
                      placeholder="Enter your organization description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qris"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">
                    QRIS Bank Account
                  </FormLabel>
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
                          className={
                            qrisFileName ? 'text-black' : 'text-[#188290]'
                          }
                        >
                          {qrisFileName || 'Upload your QRIS'}
                        </span>
                        <input
                          id="file-upload-qris"
                          type="file"
                          accept="image/*"
                          onChange={handleQrisFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && (
              <p className="text-red-600 text-center mt-4">{errorMessage}</p>
            )}
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className={`px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
                disabled={loading}
              >
                {loading ? 'Creating Your Account...' : 'Create Your Account'}
              </button>
            </div>
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

export default RegisterInstitution
