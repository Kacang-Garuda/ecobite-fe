'use client'

import axios from 'axios'
import { MoveLeft, Phone } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { FoodDonation } from '@/modules/AuthenticationModule/interface'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { useAuth } from '@/modules/AuthenticationModule/context/Authentication'
import DialogBooking from '../../module-elements/DialogBooking'

const FoodDonationDetail = ({ params }: { params: { id: string } }) => {
  const [foodDonation, setFoodDonation] = useState<FoodDonation>()
  const [isOpenBookingDialog, setIsOpenBookingDialog] = useState(false)

  const { user } = useAuth()

  async function getFoodDonation() {
    const token = Cookies.get('token')

    if (token) {
      const response = await axios.get(
        `http://localhost:3001/api/food-donation/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (response.data) {
        setFoodDonation(response.data.data)
      }
    }
  }

  useEffect(() => {
    getFoodDonation()
  }, [])

  return (
    <section className="relative max-w-screen-2xl mx-auto min-h-screen px-20 py-20 flex flex-col items-center gap-10">
      <DialogBooking
        open={isOpenBookingDialog}
        setOpen={setIsOpenBookingDialog}
        donationId={params.id}
      />
      <div className="flex items-center w-full relative">
        <Link href={'/donate/food-donation'} className="absolute left-0">
          <MoveLeft className="text-[#188290] w-10 h-10" />
        </Link>
        <div className="flex-grow text-center">
          {!foodDonation ? (
            <Skeleton className="w-[300px] h-[50px] mx-auto" />
          ) : (
            <div className="flex flex-col ">
              <span className="font-bold text-[#02353C] text-[32px]">
                {foodDonation.title}
              </span>
              <span>
                Donated on {format(foodDonation.createdAt, 'dd/MM/yyyy HH:MM')}{' '}
                WIB
              </span>
            </div>
          )}
        </div>
      </div>
      {!foodDonation ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="w-[700px] h-[100px]" />
          <Skeleton className="w-[700px] h-[100px]" />
          <Skeleton className="w-[700px] h-[100px]" />
        </div>
      ) : (
        <div className="w-full flex gap-8">
          <div className="w-[40%] flex flex-col gap-6">
            <Image
              src={foodDonation.imageUrl}
              alt={`${foodDonation.title} image`}
              width={300}
              height={100}
            />
            <div className="flex items-center gap-4">
              <Image
                src={foodDonation.user.profileImage}
                alt={`${foodDonation.user.name} photo`}
                width={60}
                height={60}
                className="rounded-full overflow-hidden"
              />
              <div>
                <span className="font-semibold text-lg text-[#333333]">
                  {foodDonation.user.name}
                </span>
                <span className="flex gap-2">
                  <Phone />
                  {foodDonation.user.phone}
                </span>
              </div>
            </div>
          </div>
          <div className="w-[60%] flex flex-col gap-4">
            <ReactMarkdown className="markdown">
              {foodDonation.description.replaceAll(/\n/g, '\n\n')}
            </ReactMarkdown>
            <span className="font-semibold text-lg">
              Quantity: {foodDonation.remainingQuantity} pcs
            </span>
            <span className="font-semibold text-lg">
              Expired Date: {format(foodDonation.expiredDate, 'dd/MM/yyyy')}
            </span>
            <span className="text-lg">
              <span className="font-semibold ">Pickup Instruction:</span>
              <ReactMarkdown className="markdown mt-[-12px]">
                {foodDonation.instruction.replaceAll(/\n/g, '\n\n')}
              </ReactMarkdown>
            </span>
            <button
              type="button"
              className={`px-6 py-3 w-max font-semibold text-white rounded-lg ${!foodDonation || !user?.email || foodDonation.userEmail === user?.email ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
              disabled={
                !foodDonation ||
                !user?.email ||
                foodDonation.userEmail === user?.email
              }
              onClick={() => setIsOpenBookingDialog(true)}
            >
              Book
            </button>
            <div className="w-full flex flex-col gap-2">
              <h4 className="font-bold text-lg">Location:</h4>
              <Link
                href={foodDonation.location}
                target="_blank"
                className="w-max hover:underline"
              >
                {foodDonation.location}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default FoodDonationDetail
