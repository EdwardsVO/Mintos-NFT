import React from 'react';
import MobileNav from '../../components/Navbar/MobileNav';
import SearchBar from '../../components/SearchBar';

export default function Landing() {
  return (
    <div className="min-h-screen min-w-full p-4">
      <div className="">
        <h1 className="font-bold; text-xl ml-12">Welcome</h1>
        <img src="/logo.png" alt="logo" className="w-36" />
      </div>
      <div className="mt-6">
        <SearchBar />
      </div>
      <div>
        <MobileNav />
      </div>
    </div>
  );
}
