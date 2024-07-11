'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthenticationModule/context/Authentication';
import EditProfileIndividualPage from './editprofile/individual';
import EditProfileInstitutionPage from './editprofile/institution';

const DashboardLandingPage = () => {
  const { user, isLoading } = useAuth();
  const [activePage, setActivePage] = useState<string | null>('editProfile');
  
  useEffect(() => {
    if (!isLoading && !user) {
      setActivePage(null);  // Set to null or any other default state when the user is not logged in
    } else {
      setActivePage('editProfile')
    }
  }, [isLoading, user]);

  const handleEditProfileClick = () => {
    setActivePage('editProfile');
  };

  const handleMyDonationClick = () => {
    setActivePage('myDonation');
  };

  const handleFoodBookedClick = () => {
    setActivePage('foodBooked');
  };

  const handleVolunteerClick = () => {
    setActivePage('volunteer');
  };

  const renderContent = () => {
    if (isLoading || !user) {
      return <div className='flex w-full h-full justify-center items-center'><img src="/images/circular-determinate.svg" alt="Circular Loading" className='animate-spin'/></div>;
    }

    switch (activePage) {
      case 'editProfile':
        return user.isInstitution ? <EditProfileInstitutionPage /> : <EditProfileIndividualPage />;
      case 'myDonation':
        return <div>My Donation Page</div>;
      case 'foodBooked':
        return <div>Food Booked Page</div>;
      case 'volunteer':
        return <div>Volunteer Page</div>;
      default:
        return <></>;
    }
  };

  return (
    <div className='flex flex-row px-20 justify-center gap-12 py-20'>
      <div className='flex flex-col gap-2 dashboard-container py-4 px-6 w-[18.4375rem] font-medium h-max'>
        <button className='flex flex-row gap-2 items-center' onClick={handleEditProfileClick}>
          <img src="/images/people-icon.svg" alt="People Icon" className='pr-2 w-8' />Edit Profile
        </button>
        <button className='flex flex-row gap-2 items-center' onClick={handleMyDonationClick}>
          <img src="/images/dashboard/suit-heart-fill.svg" alt="Suit Heart Icon" className='pr-2 w-8' />My Donation
        </button>
        <button className='flex flex-row gap-2 items-center' onClick={handleFoodBookedClick}>
          <img src="/images/dashboard/cutlery-fill.svg" alt="Cutlery Icon" className='pr-2 w-8' />Food Booked
        </button>
        <button className='flex flex-row gap-2 items-center' onClick={handleVolunteerClick}>
          <img src="/images/dashboard/briefcase-fill.svg" alt="Briefcase Icon" className='pr-2 w-8' />Volunteer
        </button>
      </div>
      <div className='w-full dashboard-container'>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardLandingPage;
