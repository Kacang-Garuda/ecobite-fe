'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
  }

  const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    const path = usePathname();
    const getClass = (path === href ? 'text-[#02353C] font-bold' : 'text-[#828282] hover:text-[#02353C] hover:font-semibold')
  return (
    <a href={href} className={getClass}>
        {children}
    </a>
  )
}

export default NavLink