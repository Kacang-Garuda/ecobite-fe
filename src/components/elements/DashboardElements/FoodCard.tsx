import React, { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

interface CardProps {
  id: string
  img: string
  nama: string
  description: string
  statusPickUp: boolean
}

const FoodCard: React.FC<CardProps> = ({
  id,
  img,
  nama,
  description,
  statusPickUp,
}) => {
  const [isPickedUp, setIsPickedUp] = useState(statusPickUp)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    if (!isPickedUp) {
      setDropdownOpen(!dropdownOpen)
    }
  }

  const handleStatusChange = async () => {
    setIsPickedUp(!isPickedUp)
    setDropdownOpen(false)
    const token = Cookies.get('token')
    if (token) {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/food-donation/picked-up/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.error('Failed to fetch data', error)
      }
    }
  }

  return (
    <div className="px-5 py-4 card-element w-max h-max flex flex-col items-center gap-4">
      <div className="w-[16.25rem] h-[6.25rem] flex-shrink-0 bg-[#D9D9D9] rounded-lg relative">
        <div className="absolute right-0 mt-2 mr-2">
          <button
            className={`flex px-2 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold ${isPickedUp ? 'bg-[#449342] text-white' : 'bg-[#EEDD42] text-white'}`}
            onClick={toggleDropdown}
            disabled={isPickedUp}
          >
            {isPickedUp ? 'Picked up' : 'Wait for pick up'}
            {!isPickedUp && (
              <svg
                className={`w-4 h-4 transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            )}
          </button>
          {dropdownOpen && !isPickedUp && (
            <div className="absolute right-0 w-full origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg outline-none">
              <div
                className=""
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block px-4 py-2 text-xs font-semibold text-left text-[#333333] hover:bg-gray-100 hover:text-gray-900 w-full"
                  onClick={handleStatusChange}
                >
                  {isPickedUp ? 'Wait for pick up' : 'Picked up'}
                </button>
              </div>
            </div>
          )}
        </div>
        <img src={img} alt={nama} className="w-full h-full" />
      </div>
      <div className="w-full">
        <p className="font-bold text-sm">{nama}</p>
        <p className="text-xs font-normal">Booked on {description}</p>
      </div>
      <div>
        <button className="px-8 py-3 font-semibold text-sm bg-[#188290] rounded-lg hover:bg-[#02353C] text-white">
          View Details
        </button>
      </div>
    </div>
  )
}

export default FoodCard
