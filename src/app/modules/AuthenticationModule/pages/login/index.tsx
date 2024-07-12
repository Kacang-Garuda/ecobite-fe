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
import { Checkbox } from '@/components/ui/checkbox'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useAuth } from '../../context/Authentication'

const individualSchema = z.object({
  email: z.string().min(1, { message: 'Please enter an email' }).email(),
  password: z.string().min(1, { message: 'Please enter a password' }),
})

const LoginPage = () => {
  const { user, isLoggedIn, setIsLoggedIn, setUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const form = useForm<z.infer<typeof individualSchema>>({
    resolver: zodResolver(individualSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const savedEmail = Cookies.get('email')
    const savedPassword = Cookies.get('password')
    const rememberMe = Cookies.get('rememberMe') === 'true'

    if (savedEmail && savedPassword) {
      form.setValue('email', savedEmail)
      form.setValue('password', savedPassword)
      setRememberMe(rememberMe)
    }
  }, [form])

  useEffect(() => {
    const token = Cookies.get('token')
    if (user && isLoggedIn && token) {
      router.push('/')
    }
  }, [user, isLoggedIn, router])

  const onSubmit = async (data: z.infer<typeof individualSchema>) => {
    try {
      setLoading(true)
      setErrorMessage('')
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        data
      )
      const { token, user } = response.data.data

      Cookies.set('token', token)
      setUser(user)
      setIsLoggedIn(true)

      if (rememberMe) {
        Cookies.set('email', data.email, { expires: 7 })
        Cookies.set('password', data.password, { expires: 7 })
        Cookies.set('rememberMe', 'true', { expires: 7 })
      } else {
        Cookies.remove('email')
        Cookies.remove('password')
        Cookies.set('rememberMe', 'false')
      }

      if (response.data.code == 200) {
        router.push('/')
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 400
      ) {
        setErrorMessage('Username or password is incorrect.')
      } else {
        console.error('Error submitting form', error)
      }
    } finally {
      setLoading(false)
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
              onClick={() => router.back()}
            >
              <img
                src="/images/authentication/arrow-left.svg"
                alt="Arrow Left"
              />
            </button>
          </div>
          <div className="flex justify-center items-center pt-4 flex-col gap-3">
            <p className="text-4xl text-[#02353C]">Welcome back!</p>
            <p className="font-semibold text-lg">
              Don’t have an account yet?{' '}
              <a
                className="text-[#188290] hover:text-[#02353C]"
                href="/register"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/2 gap-6 flex flex-col font-normal"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className={`py-4 ${fieldState.error ? 'border-[#EB5757] bg-[rgba(235,87,87,0.15)]' : ''}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-[#333]">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        className={`py-4 pl-10 ${fieldState.error ? 'border-[#EB5757] bg-[rgba(235,87,87,0.15)]' : ''}`}
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setRememberMe(checked)
                  }
                }}
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <button
              type="submit"
              className={`mt-4 px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Login'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
