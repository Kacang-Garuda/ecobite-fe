import Link from 'next/link'
import React from 'react'

const DonateModule = () => {
  return (
    <section className="min-h-screen pt-20 flex gap-10">
      <Link href={'/donate/food-donation'}>FOOD</Link>
      <Link href={'/donate/money-donation'}>MONEY</Link>
    </section>
  )
}

export default DonateModule
