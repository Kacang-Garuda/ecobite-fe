import React from 'react'

interface SidebarProps {
  onEditProfileClick: () => void
  onMyDonationClick: () => void
  onFoodBookedClick: () => void
  onVolunteerClick: () => void
  onCreateEventClick?: () => void
  onManageEventClick?: () => void
  onMoneyReceivedClick?: () => void
  onFoodReceivedClick?: () => void
  onFoodDonatedClick?: () => void
}

const IndividualSidebar: React.FC<SidebarProps> = ({
  onEditProfileClick,
  onMyDonationClick,
  onFoodBookedClick,
  onVolunteerClick,
}) => (
  <div className="flex flex-col gap-2 dashboard-container py-4 px-6 w-[18.4375rem] font-medium h-max">
    <button
      className="flex flex-row gap-2 items-center"
      onClick={onEditProfileClick}
    >
      <img
        src="/images/people-icon.svg"
        alt="People Icon"
        className="pr-2 w-8"
      />
      Edit Profile
    </button>
    <button
      className="flex flex-row gap-2 items-center"
      onClick={onMyDonationClick}
    >
      <img
        src="/images/dashboard/suit-heart-fill.svg"
        alt="Suit Heart Icon"
        className="pr-2 w-8"
      />
      My Donation
    </button>
    <button
      className="flex flex-row gap-2 items-center"
      onClick={onFoodBookedClick}
    >
      <img
        src="/images/dashboard/cutlery-fill.svg"
        alt="Cutlery Icon"
        className="pr-2 w-8"
      />
      Food Booked
    </button>
    <button
      className="flex flex-row gap-2 items-center"
      onClick={onVolunteerClick}
    >
      <img
        src="/images/dashboard/briefcase-fill.svg"
        alt="Briefcase Icon"
        className="pr-2 w-8"
      />
      Volunteer
    </button>
  </div>
)

export default IndividualSidebar
