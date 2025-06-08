import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Text */}
        <p className="text-sm">&copy; {new Date().getFullYear()} INSTRUCTIQ. All rights reserved.</p>

        {/* Right Links */}
        <div className="flex space-x-6 mt-3 md:mt-0">
          <Link href="/dashboard">
            <span className="hover:text-yellow-300 transition">Dashboard</span>
          </Link>
          <Link href="/dashboard/upgrade">
            <span className="hover:text-yellow-300 transition">Upgrade</span>
          </Link>
          <Link href="/dashboard/HowWorks">
            <span className="hover:text-yellow-300 transition">How it Works?</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
