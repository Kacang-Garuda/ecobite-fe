import React from 'react'

const CoreValues = () => {
  return (
    <div className="flex flex-wrap py-14 px-20 gap-8 core-values-bg w-full justify-evenly">
      <p className="font-bold text-[#2EAF7D] text-8xl max-w-lg flex self-center">
        Our Core Values
      </p>
      <div className="relative  flex justify-center items-center group core-values-container">
        <img
          src="/images/home/sustainability.svg"
          alt="Sustainability Img"
          className="w-full  transition-opacity duration-700 group-hover:opacity-0"
        />
        <div className="w-full absolute  transition-opacity duration-700 opacity-0 group-hover:opacity-100 justify-center items-center flex flex-col px-8">
          <p className="font-semibold text-3xl">Sustainability</p>
          <p className="text-center">
            Reduce food waste and promote enviromentally friendly practices
          </p>
        </div>
      </div>
      <div className="relative  flex justify-center items-center group core-values-container">
        <img
          src="/images/home/volunteerism.svg"
          alt="Volunteerism Img"
          className="w-full justify-center items-center transition-opacity duration-700 group-hover:opacity-0"
        />
        <div className="w-full absolute  transition-opacity duration-700 opacity-0 group-hover:opacity-100 justify-center items-center flex flex-col px-8">
          <p className="font-semibold text-3xl">Volunteerism</p>
          <p className="text-center">
            Facilitate and celebrate community volunteer efforts.
          </p>
        </div>
      </div>
      <div className="relative  flex justify-center items-center group core-values-container hover:pr-8 hover:pl-8 pr-16 ">
        <img
          src="/images/home/inclusivity.svg"
          alt="Inclusivity Img"
          className="w-full  transition-opacity duration-700 group-hover:opacity-0"
        />
        <div className="w-full absolute  transition-opacity duration-700 opacity-0 group-hover:opacity-100 justify-center items-center flex flex-col px-8">
          <p className="font-semibold text-3xl">Inclusivity</p>
          <p className="text-center">
            Promote respect, diversity, and inclusivity among users.
          </p>
        </div>
      </div>
      <div className="relative  flex justify-center items-center group core-values-container">
        <img
          src="/images/home/trust.svg"
          alt="Trust Img"
          className="w-full  transition-opacity duration-700 group-hover:opacity-0"
        />
        <div className="w-full absolute  transition-opacity duration-700 opacity-0 group-hover:opacity-100 justify-center items-center flex flex-col px-4">
          <p className="font-semibold text-3xl">Trust</p>
          <p className="text-center">
            Maintain safety, transparency, and accountability in all
            interactions.
          </p>
        </div>
      </div>
      <div className="relative  flex justify-center items-center group core-values-container px-16">
        <img
          src="/images/home/empowerment.svg"
          alt="Empowerment Img"
          className="w-full  transition-opacity duration-700 group-hover:opacity-0"
        />
        <div className="w-full absolute  transition-opacity duration-700 opacity-0 group-hover:opacity-100 justify-center items-center flex flex-col px-8">
          <p className="font-semibold text-3xl">Community Empowerment</p>
          <p className="text-center">
            Connect and support users through shared food and volunteer
            opportunities.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CoreValues
