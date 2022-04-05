import React from 'react';
import {
  CogIcon,
  GalleryIcon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from '../icons';

export default function MobileNav() {
  return (
    <div className="bg-figma-500 h-16 w-full fixed bottom-0 px-5 rounded-t-2xl">
      <div className="flex justify-between self-center">
        <HomeIcon className="w-7 h-7 self-center" />
        <GalleryIcon className="w-7 h-7 self-center" />
        <PlusCircleIcon className="w-14 h-14 fill-figma-100 text-figma-200" />
        <UserIcon className="w-7 h-7 self-center" />
        <CogIcon className="w-7 h-7 self-center" />
      </div>
    </div>
  );
}
