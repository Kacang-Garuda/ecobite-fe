import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import DisplayCard from '../../module-elements/DisplayCard'
import { FOOD_DONATION_CATEGORY } from '../../constant'
import { categoryType } from '../../interface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Cookies from 'js-cookie'
import axios from 'axios'
import { FoodDonation } from '@/modules/AuthenticationModule/interface'
import FoodDonationCard from '../../module-elements/FoodDonationCard'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

const DonateSection = ({
  setCategory,
}: {
  setCategory: Dispatch<SetStateAction<categoryType>>
}) => {
  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-bold text-[32px] text-[#02353C] text-center">
        What do you want to donate?
      </h1>
      <div className="flex flex-wrap justify-center gap-10 px-24">
        {FOOD_DONATION_CATEGORY.map((value) => (
          <DisplayCard
            key={value.title}
            image={value.image}
            title={value.title}
            description={value.description}
            onClick={() => setCategory(value.category as categoryType)}
          />
        ))}
      </div>
    </section>
  )
}

const FoodPoint = () => {
  const [listFoodDonations, setListFoodDonations] = useState<FoodDonation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  async function getAllFoodDonations() {
    const token = Cookies.get('token')

    if (token) {
      setIsLoading(true)

      const response = await axios.get(
        'http://localhost:3001/api/food-donation',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data) {
        setListFoodDonations(response.data.data)
      }

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllFoodDonations()
  }, [])

  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-bold text-[32px] text-[#02353C] text-center">
        What you need today?
      </h1>
      <div className="flex flex-wrap justify-center gap-10 px-24">
        {isLoading ? (
          <div className="flex flex-wrap gap-5">
            <Skeleton className="w-[300px] h-[300px]" />
            <Skeleton className="w-[300px] h-[300px]" />
            <Skeleton className="w-[300px] h-[300px]" />
          </div>
        ) : (
          listFoodDonations.map((value) => (
            <FoodDonationCard
              key={value.title}
              image={value.imageUrl}
              title={value.title}
              remainingQuantity={value.remainingQuantity}
              onClick={() => router.push(`/donate/${value.id}`)}
            />
          ))
        )}
      </div>
    </section>
  )
}

const FoodDonationHome = ({
  setCategory,
}: {
  setCategory: Dispatch<SetStateAction<categoryType>>
}) => {
  return (
    <section>
      <Tabs defaultValue="Donate" className="w-full flex flex-col items-center">
        <TabsList>
          <TabsTrigger value="Donate">Donate</TabsTrigger>
          <TabsTrigger value="Food Point">Food Point</TabsTrigger>
        </TabsList>
        <TabsContent value="Donate">
          <DonateSection setCategory={setCategory} />
        </TabsContent>
        <TabsContent value="Food Point">
          <FoodPoint />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default FoodDonationHome
