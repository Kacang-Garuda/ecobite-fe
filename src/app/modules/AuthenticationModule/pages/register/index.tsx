'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ChooseButton from '@/components/elements/AuthenticationElements/ChooseButton';
import RegisterInstitution from './institution';
import RegisterIndividual from './individual';
import { useAuth } from '../../context/Authentication';

const RegisterLandingPage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const renderComponent = () => {
    if (selectedOption === 'Institution') {
      return <RegisterInstitution onBack={() => setSelectedOption(null)} />;
    }

    if (selectedOption === 'Individual') {
      return <RegisterIndividual onBack={() => setSelectedOption(null)} />;
    }

    return (
      <div className='flex flex-col relative w-full'>
        <div className='relative flex flex-col flex-grow items-center justify-center bg-white p-20 font-bold gap-16'>
          <div className='relative flex flex-col items-center gap-3 pt-16'>
            <p className='text-3xl text-[#02353C]'>How will you use EcoBite?</p>
            <p className='text-lg font-semibold text-[#333]'>Please select an option below.</p>
          </div>
          <div className='relative w-full flex justify-center'>
            <div className='flex gap-20 w-max'>
              <ChooseButton 
                label='Institution' 
                img='/images/authentication/building-icon.svg' 
                onClick={() => setSelectedOption('Institution')} 
              />
              <ChooseButton 
                label='Individual' 
                img='/images/authentication/person-icon.svg' 
                onClick={() => setSelectedOption('Individual')} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderComponent();
};

export default RegisterLandingPage;
