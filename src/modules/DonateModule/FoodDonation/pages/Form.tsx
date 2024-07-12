'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { categoryType } from '../../interface'
import { MoveLeft } from 'lucide-react'
import { CATEGORY_TO_TITLE } from '../../constant'
import ReactMarkdown from 'react-markdown'
import FormSection from '../sections/FormSection'

const FoodDonationForm = ({
  category,
  setCategory,
}: {
  category: categoryType
  setCategory: Dispatch<SetStateAction<categoryType>>
}) => {
  const TEXT = `- All donated food must be fresh, properly stored, and within its expiration date. Ensure all items are in good condition, with no signs of spoilage or contamination.\n- Label all items with what it is and the expiration date. If it has common allergens (like nuts, dairy, gluten), please mention that in the description.
\n- You can donate as much or as little as you want - there's no minimum or maximum amount.\n\nBy donating food through our app, you agree to adhere to these terms and conditions to ensure the safety and well-being of all recipients.`

  return (
    <section className="max-w-screen-md mx-auto flex flex-col items-center gap-10">
      <div className="flex items-center w-full relative">
        <button className="absolute left-0" onClick={() => setCategory('')}>
          <MoveLeft className="text-[#188290] w-10 h-10" />
        </button>
        <div className="flex-grow text-center">
          <span className="font-bold text-[#02353C] text-[32px]">
            Donate: {CATEGORY_TO_TITLE[category ? category : 'STAPLES']}
          </span>
        </div>
      </div>
      <div className="relative">
        <span className="absolute top-[-20px] left-5 px-[26px] py-[10px] bg-[#EBB057] rounded-[8px] font-bold text-white text-xl">
          Terms & Conditions
        </span>
        <div className="p-10 bg-[#EBB0572E] rounded-[8px]">
          <ReactMarkdown className="markdown">
            {TEXT.replaceAll(/\n/g, '\n\n')}
          </ReactMarkdown>
        </div>
      </div>
      <FormSection category={category} />
    </section>
  )
}

export default FoodDonationForm
