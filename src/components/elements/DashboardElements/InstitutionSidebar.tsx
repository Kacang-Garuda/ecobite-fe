import React, { useState } from 'react';

interface SidebarProps {
  onEditProfileClick: () => void;
  onMyDonationClick: () => void;
  onFoodBookedClick: () => void;
  onVolunteerClick: () => void;
  onCreateEventClick: () => void;
  onManageEventClick: () => void;
  onMoneyReceivedClick: () => void;
  onFoodReceivedClick: () => void;
  onFoodDonatedClick: () => void;
}

const InstitutionSidebar: React.FC<SidebarProps> = ({
  onEditProfileClick,
  onCreateEventClick,
  onManageEventClick,
  onMoneyReceivedClick,
  onFoodReceivedClick,
  onFoodDonatedClick,
}) => {
  const [isEventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [isDonationDropdownOpen, setDonationDropdownOpen] = useState(false);

  const toggleEventDropdown = () => setEventDropdownOpen(!isEventDropdownOpen);
  const toggleDonationDropdown = () => setDonationDropdownOpen(!isDonationDropdownOpen);

  return (
    <div className='flex flex-col gap-2 dashboard-container py-4 px-6 w-[18.4375rem] h-max'>
      <button className='flex flex-row gap-2 items-center font-bold' onClick={onEditProfileClick}>
        <img src="/images/people-icon.svg" alt="People Icon" className='pr-2 w-8' />Edit Profile
      </button>
      <div className='flex flex-col gap-2'>
        <button className='flex flex-row gap-2 items-center font-bold' onClick={toggleEventDropdown}>
          <img src="/images/dashboard/calendar-event-fill.svg" alt="Event Icon" className='pr-2 w-8' />
          Event
          <img src={isEventDropdownOpen ? "/images/arrow-up.svg" : "/images/arrow-down.svg"} alt="Arrow" className='ml-auto'/>
        </button>
        {isEventDropdownOpen && (
          <div className='flex flex-col ml-8 gap-2 items-start'>
            <button onClick={onCreateEventClick}>Create Event</button>
            <button onClick={onManageEventClick}>Manage Event</button>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <button className='flex flex-row gap-2 items-center font-bold' onClick={toggleDonationDropdown}>
          <img src="/images/dashboard/cutlery-fill.svg" alt="Cutlery Icon" className='pr-2 w-8' />
          Donation
          <img src={isDonationDropdownOpen ? "/images/arrow-up.svg" : "/images/arrow-down.svg"} alt="Arrow" className='ml-auto'/>
        </button>
        {isDonationDropdownOpen && (
          <div className='flex flex-col ml-8 gap-2 items-start'>
            <button onClick={onMoneyReceivedClick}>Money Received</button>
            <button onClick={onFoodReceivedClick}>Food Received</button>
            <button onClick={onFoodDonatedClick}>Food Donated</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstitutionSidebar;
