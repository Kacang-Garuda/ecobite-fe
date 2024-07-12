'use client'
import React, { useEffect, useState } from 'react';
import FoodCard from '../../../../../components/elements/DashboardElements/FoodCard';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FoodDonation, Transaction } from '@/modules/AuthenticationModule/interface';
import NullFood from '@/components/elements/DashboardElements/NullFood';
import { format } from 'date-fns';
import MyDonationCard from '@/components/elements/DashboardElements/MyDonationCard';
import InstitutionDonationCard from '@/components/elements/DashboardElements/InstitutionDonationCard';

const MyDonationIndividual = () => {
  const [foodDonated, setFoodDonated] = useState<FoodDonation[] | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');

      if (token) {
        try {
          const response = await axios.get(
            'http://localhost:3001/api/food-donation/my-donation/',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setFoodDonated(response.data.data);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="relative flex flex-col flex-grow items-center justify-center bg-white px-16 py-6 font-bold">
      <div className="w-full flex flex-row justify-center relative py-4">
        <div className="flex justify-center items-center">
          <p className="text-3xl text-[#02353C]">Food Donated</p>
        </div>
      </div>
      {foodDonated && foodDonated.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-start">
          {foodDonated.map((value, index) => {
            const lastProgress = value.progress[value.progress.length - 1];
            return (
              <InstitutionDonationCard
                key={index}
                id={value.id}
                img={value.imageUrl}
                nama={value.title}
                description={lastProgress ? format(lastProgress.createdAt, 'dd/MM/yyyy hh:mm aa') : 'No progress available'}
                status={lastProgress ? lastProgress.status : 'No status available'}
                recipient={lastProgress.user.name}
              />
            );
          })}
        </div>
      ) : (
        <NullFood isDonation={true} />
      )}
    </div>
  );
};

export default MyDonationIndividual;