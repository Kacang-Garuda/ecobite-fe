import React, { Dispatch, SetStateAction } from 'react'
import DisplayCard from '../../module-elements/DisplayCard'
import { FOOD_DONATION_CATEGORY } from '../../constant'
import { categoryType } from '../../interface'

const FoodDonationHome = ({
  setCategory,
}: {
  setCategory: Dispatch<SetStateAction<categoryType>>
}) => {
  return (
    <section className="flex flex-col gap-10">
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

export default FoodDonationHome
