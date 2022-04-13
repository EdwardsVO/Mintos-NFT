import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import LockIcon from '../icons/LockIcon';
import MoneyIcon from '../icons/MoneyIcon';

interface StepsProps {
  logo: string;
  text: string;
  extra?: string;
}
export default function Steps({ logo, text, extra }: StepsProps) {
  return (
    <div className="flex space-x-4 lg:space-x-7">
      <div className="rounded-full bg-figma-600 bg-opacity-60 w-16 h-16 lg:w-20 lg:h-20 text-figma-300 p-3 lg:p-4">
        {logo === 'lock' ? <LockIcon className="" /> : ''}
        {logo === 'check' ? <CheckIcon /> : ''}
        {logo === 'crypto' ? <MoneyIcon /> : ''}
      </div>
      <div className="self-center">
        <h2 className="text-figma-300 text-lg font-semibold">{text}</h2>
        <h2 className="text-figma-300 text-sm font-semibold">{extra}</h2>
      </div>
    </div>
  );
}
