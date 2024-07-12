import React from "react";

interface NullFoodProps {
  isDonation: boolean;
}

const NullFood: React.FC<NullFoodProps> = ({ isDonation }) => {
  return (
    <div className="flex items-center justify-center w-full h-full p-20">
      <p className="font-bold text-xl text-[#828282]">
        You don’t have any food {isDonation ? "donated" : "booked"} :(
      </p>
    </div>
  );
};

export default NullFood;
