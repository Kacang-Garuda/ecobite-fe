import React from 'react';

const CoreValues = () => {
  return (
    <div className="flex flex-wrap py-14 px-20 gap-8 core-values-bg w-full justify-evenly">
      <p className="font-bold text-[#2EAF7D] text-8xl max-w-lg flex self-center">Our Core Values</p>   
      <div className="relative  flex justify-center items-center group core-values-container">
        <img src="/images/home/sustainability.svg" alt="Sustainability Img" className="w-full  transition-opacity duration-700 group-hover:opacity-0" />
        <img src="/images/home/sustainability-hover.svg" alt="Sustainability Hover Img" className="w-full absolute  transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
      </div>
      <div className="relative  flex justify-center items-center group core-values-container">
        <img src="/images/home/volunteerism.svg" alt="Volunteerism Img" className="w-full  transition-opacity duration-700 group-hover:opacity-0" />
        <img src="/images/home/volunteerism-hover.svg" alt="Volunteerism Hover Img" className="w-full  absolute transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
      </div>
      <div className="relative  flex justify-center items-center group core-values-container hover:pr-8 hover:pl-8 pr-16 ">
        <img src="/images/home/inclusivity.svg" alt="Inclusivity Img" className="w-full  transition-opacity duration-700 group-hover:opacity-0" />
        <img src="/images/home/inclusivity-hover.svg" alt="Inclusivity Hover Img" className="w-full  absolute transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
      </div>
      <div className="relative  flex justify-center items-center group core-values-container">
        <img src="/images/home/trust.svg" alt="Trust Img" className="w-full  transition-opacity duration-700 group-hover:opacity-0" />
        <img src="/images/home/trust-hover.svg" alt="Trust Hover Img" className="w-full  transition-opacity absolute duration-700 opacity-0 group-hover:opacity-100" />
      </div>
      <div className="relative  flex justify-center items-center group core-values-container px-16">
        <img src="/images/home/empowerment.svg" alt="Empowerment Img" className="w-full  transition-opacity duration-700 group-hover:opacity-0" />
        <img src="/images/home/empowerment-hover.svg" alt="Empowerment Hover Img" className="w-full  transition-opacity absolute duration-700 opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default CoreValues;
