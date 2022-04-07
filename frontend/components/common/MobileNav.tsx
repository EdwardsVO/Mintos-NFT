import { useRouter } from 'next/router';
import React from 'react';
import {
  CogIcon,
  GalleryIcon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from '../icons';

export default function MobileNav() {
  const router = useRouter();
  return (
    <div className="bg-figma-500 h-20 w-full fixed bottom-0 px-6 rounded-t-2xl">
      <div className="flex justify-between mt-2">
        <button
          type="button"
          onClick={() => {
            router.push('/app');
          }}
        >
          <HomeIcon className="w-7 h-7 self-center" />
        </button>
        <button
          type="button"
          onClick={() => {
            router.push('/app/gallery');
          }}
        >
          <GalleryIcon className="w-7 h-7 self-center" />
        </button>
        <button
          type="button"
          onClick={() => {
            router.push('/app/mint');
          }}
        >
          <PlusCircleIcon className="w-14 h-14 fill-figma-100 text-figma-200" />
        </button>
        <button
          type="button"
          onClick={() => {
            router.push('/app/profile');
          }}
        >
          <UserIcon className="w-7 h-7 self-center" />
        </button>
        <button
          type="button"
          onClick={() => {
            router.push('/app');
          }}
        >
          <CogIcon className="w-7 h-7 self-center" />
        </button>
      </div>
    </div>
  );
}
