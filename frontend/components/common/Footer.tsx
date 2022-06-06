import React from 'react';
import EmailIcon from '../icons/EmailIcon';
import PhoneIcon from '../icons/PhoneIcon';
import InstagramIcon from '../icons/InstagramIcon';
import TwitterIcon from '../icons/TwitterIcon';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full h-60 bg-figma-100 flex flex-row justify-evenly items-center relative">
      <div className="hidden lg:block w-80 h-full">
        <img
          className="hidden lg:block w-48 ml-10 pt-10 text-white "
          src="/white_logo.png"
          alt="logo"
        />
      </div>
      <div className="md:w-80 w-32 h-40 flex flex-col justify-center">
        <p className="text-white font-semibold md:text-xl text-md mb-2">
          Contact:
        </p>
        <div className="flex flex-row items-center">
          <EmailIcon className="md:w-5 w-3 text-white" />
          <Link href="/">
            <p className="text-white md:text-base text-sm font-extralight md:ml-2 ml-1 cursor-pointer hover:underline">
              Comming Soon
            </p>
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <PhoneIcon className="md:w-5 w-3 text-white" />
          <Link href="/">
            <p className="text-white font-extralight ml-2 cursor-pointer md:mt-2 mt-1 hover:underline md:text-base text-sm">
              Comming Soon
            </p>
          </Link>
        </div>
      </div>
      <div className="md:w-80 w-32 h-40 flex flex-col justify-center">
        <p className="text-white font-semibold md:text-xl text-md mb-2">
          Information
        </p>
        <Link href="/">
          <p className="text-white font-extralight cursor-pointer hover:underline md:text-base text-sm">
            Comming Soon
          </p>
        </Link>
        <Link href="/">
          <p className="text-white font-extralight cursor-pointer hover:underline md:text-base text-sm">
            {/* //Privacy Policy */}
          </p>
        </Link>
      </div>
      <div className="hidden lg:block md:w-80 w-20 h-40 md:flex flex-col justify-center">
        <p className="text-white font-semibold text-xl mb-2">Follow Us</p>
        <div className="flex flex-row gap-x-3">
          <button onClick={()=>{alert('cliock')}} className="w-10 h-10 hover:text-black">
            <InstagramIcon className="text-white hover:text-blue-100 " />
          </button>
          <button className="w-10 h-10">
            <TwitterIcon className="text-white hover:text-blue-100" />
          </button>
        </div>
      </div>
      <div className="w-full h-full absolute flex items-end justify-end">
        <p className="text-white mb-5 text-xs mr-20">
          MintosNFT Marketplace 🚀 - Near Protocol 2022 Ⓝ
        </p>
      </div>
    </div>
  );
}
