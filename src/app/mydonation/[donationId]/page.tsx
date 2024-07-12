'use client'
import { FoodDonation } from "@/modules/AuthenticationModule/interface";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import DonationDetails from "@/modules/DashboardModule/pages/mydonation";

export default function DonationDetailsPage({
  params,
}: {
  params: { donationId: string };
}) {
  const [donation, setDonation] = useState<FoodDonation | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token')

      if (token) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/food-donation/${params.donationId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setDonation(response.data.data)
        } catch (error) {
          console.error('Failed to fetch user data', error)
        }
      }
    }

    fetchUserData()
  }, [params.donationId])

  if (!donation) {
    return <div>Loading...</div>
  }

  return (
    <DonationDetails
      title={donation.title}
      donatedAt={new Date(donation.createdAt).toLocaleDateString()}
      image={donation.imageUrl}
      recipient={donation.userEmail}
      description={donation.description}
      quantity={donation.quantity}
      expiredDate={new Date(donation.expiredDate).toLocaleDateString()}
      instruction={donation.instruction}
      progress={donation.progress}
    />
  )
}
