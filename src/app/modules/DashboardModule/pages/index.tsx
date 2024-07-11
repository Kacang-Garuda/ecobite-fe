'use client'
import React, { useState } from 'react';
import { useAuth } from '../../AuthenticationModule/context/Authentication';
import EditProfileIndividualPage from './editprofile/individual';
import EditProfileInstitutionPage from './editprofile/institution';

const DashboardLandingPage = () => {
  const { user } = useAuth()
  const [activePage, setActivePage] = useState('editProfile');

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
    switch (activePage) {
      case 'editProfile':
        return user?.isInstitution ? <EditProfileInstitutionPage /> : <EditProfileIndividualPage />;
      case 'myDonation':
        return <div>My Donation Page</div>;
      case 'foodBooked':
        return <div>Food Booked Page</div>;
      case 'volunteer':
        return <div>Volunteer Page</div>;
      default:
        return user?.isInstitution ? <EditProfileInstitutionPage /> : <EditProfileIndividualPage />;
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
