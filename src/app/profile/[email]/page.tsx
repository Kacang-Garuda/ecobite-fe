'use client'
import { User } from "@/modules/AuthenticationModule/interface";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/AuthenticationModule/context/Authentication";
import ProfileIndividual from '../../../components/elements/DashboardElements/ProfileIndividual';
import ProfileInstitution from "@/components/elements/DashboardElements/ProifileInstitution";

export default function DonationDetailsPage({
  params,
}: {
  params: { email: string };
}) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token')

      if (token) {
        try {
          const response = await axios.get(`http://localhost:3001/api/auth/${params.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(response.data.data)
          setUser(response.data.data)
        } catch (error) {
          console.error('Failed to fetch user data', error)
        }
      }
    }

    fetchUserData()
  }, [params.email])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col relative w-full">
      <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-40 py-20 font-bold">
        <div className="w-full flex flex-row justify-center relative py-12">
          <div className="absolute left-0">
            <button
              className="hover:scale-110 transition ease-in-out"
              onClick={() => router.back()}
            >
              <img
                src="/images/authentication/arrow-left.svg"
                alt="Arrow Left"
              />
            </button>
          </div>
          <div className="flex justify-center items-center pt-4 flex-col gap-3">
            <p className="text-4xl text-[#02353C]">Profile</p>            
          </div>
        </div>
        <div className="flex w-full rounded-lg">
            {user && user.isInstitution ? 
                <ProfileInstitution
                image={user.profileImage}
                nama={user.name}
                email={user.email}
                noTelp={user.phone}
                description={user.description}
            />
            :
            <ProfileIndividual 
                image={user.profileImage}
                nama={user.name}
                email={user.email}
                noTelp={user.phone}
            />
            }

        </div>
        </div>
    </div>
  )
}
