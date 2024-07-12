'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

interface VolunteerCardProps {
  id: string;
  createdAt: string;
  img: string;
  title: string;
  date: string;
  city: string;
  registeredUser: number;
  onEdit: () => void;
  handleTrigger: () => void;
}

const ManageVolunteerCard: React.FC<VolunteerCardProps> = ({
  id,
  createdAt,
  img,
  title,
  date,
  city,
  registeredUser,
  onEdit,
  handleTrigger
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDelete = async () => {
    const token = Cookies.get('token');

    if (token) {
    try {
        const response = await axios.delete(
        `http://localhost:3001/api/event/${id}/`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        console.log('delete', response.data)
    } catch (error) {
        console.error('Failed to fetch user data', error);
    } finally {
        handleTrigger()
    }
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="bg-[#F4FDFC] navbar-shadow rounded-lg w-full flex flex-col py-3 px-6">
      <div className="flex justify-between">
        <div className="flex flex-row gap-1 items-center">
          <img src="/images/dashboard/clock-fill.svg" alt="Clock Icon" className="w-6 h-6"/>
          <p className="text-xs text-[#828282] font-normal">Created on {createdAt}</p>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown}>
            <img src="/images/dashboard/three-dots.svg" alt="Three Dots Icon" className='h-6'/>
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 font-normal w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onEdit();
                  setDropdownVisible(false);
                }}
              >
                Edit Details
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => {
                  handleDelete();
                  setDropdownVisible(false);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex py-2 gap-4">
        <div className="flex w-[6.125rem] h-[6.125rem] shrink-0">
          <img src={img} alt={title} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="font-bold">{title}</div>
            <div className="flex flex-row gap-28 text-xs font-normal">
              <div className="flex gap-1">
                <img
                  src="/images/dashboard/calendar-event-fill.svg"
                  alt="Calendar Icon"
                  className="w-4 h-4"
                />
                <p>{date}</p>
              </div>
              <div className="flex gap-1">
                <img
                  src="/images/location-icon.svg"
                  alt="Location Icon"
                  className="w-4 h-4"
                />
                <p>{city}</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <label
              className={`flex px-6 py-2 justify-center items-center gap-2.5 text-xs rounded-lg font-semibold bg-[#449342] text-white`}
            >
              {registeredUser} volunteers applied
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVolunteerCard;