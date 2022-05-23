import { useRouter } from 'next/router';
import React from 'react';

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex p-4 sticky justify-between z-30">
      <div>
        <img src="/logo.png" alt="logo" className="h-14 lg:h-24" />
      </div>
      <div className="self-center">
        <button
          type="button"
          className="bg-figma-900 w-full lg:py-2 lg:px-6 rounded-lg text-figma-300 font-semibold lg:text-lg py-2 px-4"
          onClick={() => router.push('/app')}
        >
          Launch
        </button>
      </div>
    </div>
  );
}
