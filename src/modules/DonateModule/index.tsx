import { HandCoins, Utensils } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DonateModule = () => {
  return (
    <section className="min-h-screen pt-32 flex flex-col gap-12">
      <h1 className="font-bold text-[32px] text-[#02353C] text-center">
        What do you want to donate?
      </h1>
      <div className="flex justify-center items-center gap-10">
        <Link
          href={'/donate/food-donation'}
          className="w-[200px] h-[250px] shadow-lg flex flex-col hover:scale-110 transition ease-in-out"
        >
          <div className="w-full flex justify-center items-center flex-grow bg-[#2EAF7D] rounded-t-2xl opacity-40 h-full py-8 px-12">
            <Utensils className="text-white w-[60px] h-[60px]" />
          </div>
          <div className="w-full py-4 bg-[#02353C] rounded-b-2xl text-2xl text-white flex justify-center items-center">
            <p className="text-2xl">Food</p>
          </div>
        </Link>
        <Link
          href={'/donate/money-donation'}
          className="w-[200px] h-[250px] shadow-lg flex flex-col hover:scale-110 transition ease-in-out"
        >
          <div className="w-full flex justify-center items-center flex-grow bg-[#2EAF7D] rounded-t-2xl opacity-40 h-full py-8 px-12">
            <HandCoins className="text-white w-[60px] h-[60px]" />
          </div>
          <div className="w-full py-4 bg-[#02353C] rounded-b-2xl text-2xl text-white flex justify-center items-center">
            <p className="text-2xl">Money</p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default DonateModule
