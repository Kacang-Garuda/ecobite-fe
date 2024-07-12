'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '../../../context/Authentication'

const EmailVerification = () => {
  const { user } = useAuth()
  const [isDisabled, setIsDisabled] = useState(true)
  const [counter, setCounter] = useState(90)
  const router = useRouter()

  useEffect(() => {
    if (isDisabled) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 1) {
            clearInterval(timer)
            setIsDisabled(false)
            return 90
          }
          return prevCounter - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isDisabled])

  async function buttonClick() {
    setIsDisabled(true)
    try {
      const token = Cookies.get('token')
      if (token && user) {
        const sendVerification = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-email-verification`,
          user,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col relative w-full">
      <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-40 py-20 font-bold gap-8">
        <div className="w-full flex flex-row justify-center relative py-4">
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
          <div className="flex justify-center items-center pt-4">
            <p className="text-3xl text-[#02353C]">Please verify your email!</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-center text-[#333]">
          <p className="text-2xl">
            Please check your inbox and confirm your email address.
          </p>
          <p className="text-xl font-normal">
            We’ve sent a confirmation email to {user?.email}
          </p>
        </div>
        <div className="bg-[#188290] rounded-lg bg-opacity-10 flex flex-col py-5 px-6 gap-4">
          <div className="flex flex-row gap-3">
            <img
              src="/images/authentication/info-circle-fill.svg"
              alt="Info Warn"
            />
            <p className="text-xl font-semibold">Didn’t receive an email?</p>
          </div>
          <div className="max-w-xl">
            <p className="text-lg font-normal">
              If you can’t find the email in your inbox or spam folder, please
              click the button below and we will send you a new one.
            </p>
          </div>
          <div className="w-full justify-center flex">
            <button
              className={`px-10 py-4 text-xl font-semibold text-white ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'} signup-shadow rounded-lg`}
              onClick={buttonClick}
              disabled={isDisabled}
            >
              {isDisabled ? `Resend Email (${counter})` : 'Resend Email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
