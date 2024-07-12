import FoodDonationDetail from '@/modules/DonateModule/FoodDonation/pages/Detail'
import React from 'react'

const DonationDetailPage = ({ params }: { params: { id: string } }) => {
  return <FoodDonationDetail params={params} />
}

export default DonationDetailPage
