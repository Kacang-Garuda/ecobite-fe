import React from 'react'

const Profile = () => {
  return (
    <div className="relative flex flex-col w-full h-max bg-white">
      <div className="flex flex-col px-36 py-24 items-center gap-12">
        <p className="text-[#2EAF7D] text-7xl font-bold">From Spare to Share</p>
        <div className="flex flex-row w-full gap-[5.75rem] items-center">
          <img src="/images/home/ecobite-logo-lg.svg" alt="Ecobite Logo" />
          <p className="text-3xl font-medium">
            At EcoBite, we believe in turning excess into opportunity. Our
            commitment ensures no food goes to waste while addressing hunger in
            our community. Help us transform your surplus food into valuable
            meals for those who need them most. Join our effort to share
            generously and sustainably.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
