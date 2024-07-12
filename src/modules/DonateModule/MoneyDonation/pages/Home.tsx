'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import DisplayCard from '../../module-elements/DisplayCard'
import { User } from '@/modules/AuthenticationModule/interface'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

const MoneyDonationHome = () => {
  const [listInstitution, setListInstitution] = useState<User[]>([])

  const router = useRouter()

  async function getAllInstitution() {
    const token = Cookies.get('token')

    if (token) {
      const response = await axios.get(
        'http://localhost:3001/api/food-donation/institution',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data) {
        setListInstitution(response.data.data)
      }
    }
  }

  useEffect(() => {
    getAllInstitution()
  }, [])

  return (
    <section className="relative max-w-screen-2xl mx-auto min-h-screen py-20 flex flex-col gap-10">
      <h1 className="font-bold text-[32px] text-[#02353C] text-center">
        Who do you want to donate?
      </h1>
      <div className="flex flex-wrap justify-center gap-10 px-24">
        {listInstitution.length === 0 && (
          <>
            <Skeleton className="w-[300px] h-[300px]" />
            <Skeleton className="w-[300px] h-[300px]" />
            <Skeleton className="w-[300px] h-[300px]" />
          </>
        )}
        {listInstitution.map((value) => (
          <DisplayCard
            key={value.email}
            image={value.profileImage}
            title={value.name}
            onClick={() => router.push(`/donate/money-donation/${value.email}`)}
          />
        ))}
      </div>
    </section>
  )
}

export default MoneyDonationHome
