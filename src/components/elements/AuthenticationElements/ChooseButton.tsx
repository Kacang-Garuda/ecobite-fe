'use client'
import React from 'react'

interface ChooseButtonProps {
  label: string
  img: string
  onClick: () => void
}

const ChooseButton: React.FC<ChooseButtonProps> = ({ label, img, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="shadow-lg flex flex-col hover:scale-110 transition ease-in-out"
    >
      <div className="flex justify-center items-center flex-grow bg-[#2EAF7D] rounded-t-2xl opacity-40 h-full py-8 px-12">
        <img src={img} alt="Building Icon" />
      </div>
      <div className="w-full py-4 bg-[#02353C] rounded-b-2xl text-2xl text-white flex justify-center items-center">
        <p className="text-2xl">{label}</p>
      </div>
    </button>
  )
}

export default ChooseButton
