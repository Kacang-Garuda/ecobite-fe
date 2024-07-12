'use client'

import React, { useState } from 'react'
import FoodDonationHome from './pages/Home'
import FoodDonationForm from './pages/Form'
import { categoryType } from '../interface'

const FoodDonationModule = () => {
  const [category, setCategory] = useState<categoryType>('')
  return (
    <section className="relative max-w-screen-2xl mx-auto min-h-screen py-20">
      {category ? (
        <FoodDonationForm category={category} setCategory={setCategory} />
      ) : (
        <FoodDonationHome setCategory={setCategory} />
      )}
    </section>
  )
}

export default FoodDonationModule
