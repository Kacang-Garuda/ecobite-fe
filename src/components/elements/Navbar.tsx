'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import NavLink from './NavLink';
import { useAuth } from '@/app/modules/AuthenticationModule/context/Authentication';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth();

  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  const getSignUpClass = (path: string) => (
    pathname.startsWith(path)
      ? 'bg-[#828282] cursor-not-allowed'
      : 'bg-[#188290] hover:bg-[#02353C]'
  );

  const getSignInClass = (path: string) => (
    pathname.startsWith(path)
      ? 'text-[#828282] cursor-not-allowed'
      : 'text-[#02353C] hover:bg-[#B1C0C3]'
  );

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const getMenuItemClass = (path: string) => (
    pathname !== path
      ? 'text-[#828282]'
      : 'text-[#02353C] font-semibold'
  );

  const handleSignOut = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('rememberMe');
    setIsLoggedIn(false)
    setUser(null)
    setIsDropdownOpen(false);
    router.push('/login');
  };

  return (
    <nav className='fixed w-full z-50 flex p-2 flex-col items-start bg-white navbar-shadow'>
      <div className='h-full w-full flex relative items-center px-4 justify-between'>
        <div className='flex gap-[3.88rem] ml-20'>
          <div>
            <img src="/images/ecobite-logo.svg" alt="Ecobite Navbar" />
          </div>
          <div className='inline-flex gap-[2.25rem] items-center text-lg'>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/foodshare">Food Sharing</NavLink>
            <NavLink href="/volunteering">Volunteering</NavLink>
          </div>
        </div>
        <div className='inline-flex items-start gap-6 font-semibold'>
          {isLoggedIn && user ? (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <div className='font-semibold text-[#02353C] flex flex-row cursor-pointer gap-3'>
                <p>Welcome, {user.name}</p>
                <img src={isDropdownOpen ? "/images/arrow-up.svg" : "/images/arrow-down.svg"} alt="Arrow" />
              </div>
              {isDropdownOpen && (
                <div
                  className='absolute right-0 w-full bg-white border border-gray-200 rounded-md shadow-lg'
                >
                  <div className='font-normal'>
                    <a href="/profile/myfood" className={`flex items-center p-2 hover:bg-gray-100 ${getMenuItemClass('/profile/myfood')}`}>
                      <img src="/images/basket.svg" alt="Basket" className='pr-2 w-6' />My Food
                    </a>
                    <hr />
                    <a href="/profile/mydonation" className={`flex items-center p-2 hover:bg-gray-100 ${getMenuItemClass('/profile/mydonation')}`}>
                      <img src="/images/hand.svg" alt="Hand" className='pr-2 w-6' />My Donation
                    </a>
                    <hr />
                    <a href="/profile/editprofile" className={`flex items-center p-2 hover:bg-gray-100 ${getMenuItemClass('/profile/editprofile')}`}>
                      <img src="/images/person.svg" alt="Person" className='pr-2 w-6' />Edit Profile
                    </a>
                    <hr />
                    <a href="#" className='flex items-center p-2 text-[#EB5757] hover:bg-gray-100' onClick={handleSignOut}>
                      Sign Out
                    </a>
                    <hr />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                disabled={pathname.startsWith('/register')}
                onClick={() => handleNavigation('/register')}
                className={`flex justify-center items-center rounded-lg py-4 px-10 text-white signup-shadow ${getSignUpClass('/register')}`}
              >
                Sign Up
              </button>
              <button
                disabled={pathname.startsWith('/login')}
                onClick={() => handleNavigation('/login')}
                className={`flex justify-center items-center rounded-lg py-4 px-10 ${getSignInClass('/login')}`}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;