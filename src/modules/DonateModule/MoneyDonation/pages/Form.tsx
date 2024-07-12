'use client'

import { Mail, MoveLeft, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { User } from '@/modules/AuthenticationModule/interface'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { moneyDonationSchema } from '../../schema/MoneyDonation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import DialogConfirmation from '../../module-elements/DialogConfirmation'
import { useRouter } from 'next/navigation'

const MoneyDonationForm = ({ params }: { params: { email: string } }) => {
  const [institute, setInstitute] = useState<User>()
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] =
    useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof moneyDonationSchema>>({
    resolver: zodResolver(moneyDonationSchema),
    defaultValues: {
      payment: null,
    },
  })

  async function onSubmit(values: z.infer<typeof moneyDonationSchema>) {
    setIsLoading(true)

    const imageBase64 = await convertFileToBase64(values.payment)

    const data = {
      payment: imageBase64,
      recipientEmail: decodeURIComponent(params.email),
    }

    try {
      const token = Cookies.get('token')
      if (token) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/money-donation`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })

        router.replace('/donate/money-donation')
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
      form.setValue('payment', file)
    }
  }

  async function getInstitution() {
    const token = Cookies.get('token')
    if (token) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/money-donation/${params.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data) {
        setInstitute(response.data.data)
      }
    }
  }

  useEffect(() => {
    getInstitution()
  }, [])

  return (
    <section className="max-w-screen-md mx-auto min-h-screen flex flex-col items-center gap-10 py-20">
      <DialogConfirmation
        open={isOpenConfirmationDialog}
        setOpen={setIsOpenConfirmationDialog}
        isLoading={isLoading}
        handleConfirm={form.handleSubmit(onSubmit)}
      />
      <div className="flex items-center w-full relative">
        <Link href={'/donate/money-donation'} className="absolute left-0">
          <MoveLeft className="text-[#188290] w-10 h-10" />
        </Link>
        <div className="flex-grow text-center">
          <span className="font-bold text-[#02353C] text-[32px]">
            {!institute ? (
              <Skeleton className="w-[300px] h-[50px] mx-auto" />
            ) : (
              institute?.name
            )}
          </span>
        </div>
      </div>
      {!institute ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="w-[700px] h-[100px]" />
          <Skeleton className="w-[700px] h-[100px]" />
          <Skeleton className="w-[700px] h-[100px]" />
        </div>
      ) : (
        <>
          <Image
            src={institute.profileImage}
            alt={`${institute.name} image`}
            width={700}
            height={300}
          />
          <p>{institute.description}</p>
          <div className="flex flex-col gap-1 text-center">
            <h6 className="font-bold text-xl">Contact Details</h6>
            <div className="flex gap-4">
              <span className="flex gap-2">
                <Mail />
                {institute.email}
              </span>
              <span className="flex gap-2">
                <Phone />
                {institute.phone}
              </span>
            </div>
          </div>
          {institute.qris && (
            <div className="flex flex-col gap-5">
              <span className="w-max mx-auto px-20 py-4 text-lg font-semibold bg-[#C1F6ED] rounded-[8px]">
                Bank Account
              </span>
              <Image
                src={institute.qris}
                alt={`${institute.name} qris`}
                width={700}
                height={300}
              />
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload File</FormLabel>
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
                              fileName ? 'text-black' : 'text-[#188290]'
                            }
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
                      File supported: .png, .jpg
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center items-center">
                <button
                  type="button"
                  className={`px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
                  disabled={isLoading}
                  onClick={() => {
                    form.trigger().then((isFormValid) => {
                      if (isFormValid) {
                        setIsOpenConfirmationDialog(true)
                      }
                    })
                  }}
                >
                  Confirm
                </button>
              </div>
            </form>
          </Form>
        </>
      )}
    </section>
  )
}

export default MoneyDonationForm
