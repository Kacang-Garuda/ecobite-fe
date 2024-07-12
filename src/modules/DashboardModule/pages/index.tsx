'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthenticationModule/context/Authentication';
import EditProfileIndividualPage from './editprofile/individual';
import EditProfileInstitutionPage from './editprofile/institution';
import MyDonationIndividual from './mydonation/individual';
import MyDonationInstitution from './mydonation/institution';
import MyFoodIndividual from './myfood/individual';
import MyFoodInstitution from './myfood/institution';
import IndividualSidebar from '@/components/elements/DashboardElements/IndividualSidebar';
import InstitutionSidebar from '@/components/elements/DashboardElements/InstitutionSidebar';
import VolunteerLandingPage from './volunteer/index';

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

  const handleEditProfileClick = (): void => {
    setActivePage('editProfile');
  };

  const handleCreateEventClick = (): void => {
    setActivePage('createEvent')
  };

  const handleManageEventClick = (): void => {
    setActivePage('manageEvent')
  };

  const handleMoneyReceivedClick = (): void => {
    setActivePage('moneyReceived')
  };

  const handleFoodReceivedClick = (): void => {
    setActivePage('foodBooked')
  };

  const handleFoodDonatedClick = (): void => {
    setActivePage('myDonation')
  };

  const handleMyDonationClick = (): void => {
    setActivePage('myDonation');
  };

  const handleFoodBookedClick = (): void => {
    setActivePage('foodBooked');
  };

  const handleVolunteerClick = (): void => {
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
        return user.isInstitution ? <MyDonationInstitution /> : <MyDonationIndividual />
      case 'foodBooked':
        return user.isInstitution ? <MyFoodInstitution /> : <MyFoodIndividual />
      case 'volunteer':
        return <VolunteerLandingPage />
      case 'createEvent':
        return <div>create event</div>
      case 'manageEvent':
        return <div>manage event</div>
      case 'moneyReceived':
        return <div>moneyReceived</div>
      default:
        return <></>;
    }
  };

  return (
    <div className='flex flex-row px-20 justify-center gap-12 py-20'>
      {user?.isInstitution ? (
        <InstitutionSidebar
          onEditProfileClick={handleEditProfileClick}
          onCreateEventClick={handleCreateEventClick}
          onManageEventClick={handleManageEventClick}
          onMoneyReceivedClick={handleMoneyReceivedClick}
          onFoodReceivedClick={handleFoodReceivedClick}
          onFoodDonatedClick={handleFoodDonatedClick}
          onMyDonationClick={handleMyDonationClick}
          onFoodBookedClick={handleFoodBookedClick}
          onVolunteerClick={handleVolunteerClick}
        />
      ) : (
        <IndividualSidebar
          onEditProfileClick={handleEditProfileClick}
          onMyDonationClick={handleMyDonationClick}
          onFoodBookedClick={handleFoodBookedClick}
          onVolunteerClick={handleVolunteerClick}
        />
      )}
      <div className='w-full dashboard-container'>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardLandingPage;