import MoneyDonationForm from '@/modules/DonateModule/MoneyDonation/pages/Form'
import React from 'react'

const MoneyDonationFormPage = ({ params }: { params: { email: string } }) => {
  return <MoneyDonationForm params={params} />
}

export default MoneyDonationFormPage
