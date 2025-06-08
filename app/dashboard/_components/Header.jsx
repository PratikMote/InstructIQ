"use client";

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link'; // ✅ Fixes "Link is not defined"
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Questions', path: '/dashboard/questions' },
    { name: 'Upgrade', path: '/dashboard/upgrade' },
    { name: 'How it Works?', path: '/dashboard/HowWorks' },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-md w-full">
      <div className="flex items-center justify-between h-20 px-2 sm:px-4 lg:px-8">
        
        {/* Logo aligned to absolute left corner */}
        <div className="flex-shrink-0">
          <Link href="/dashboard">
            <Image
              src="/logo1.svg"
              alt="INSTRUCTIQ Logo"
              width={160}
              height={60}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <span
                className={`text-white text-lg hover:text-yellow-300 transition duration-300 cursor-pointer ${
                  path === item.path ? 'font-bold underline underline-offset-4' : ''
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* User Profile Button */}
        <div className="flex items-center">
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
