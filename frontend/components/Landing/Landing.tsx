import { ReactTypical } from '@deadcoder0904/react-typical';
import React from 'react';
import Footer from '../common/Footer';
import FAQ from './FAQ';
import Steps from './Steps';

export default function Landing() {
  return (
    <div className="h-full w-full">
      <div className="lg:py-16 lg:px-32 px-4 py-14">
        <div>
          <h2 className="text-4xl lg:text-7xl text-figma-900 font-bold">
            <ReactTypical
              steps={['Explore', 2000, 'Mint', 2000, 'Buy', 2000, 'Sell', 2000]}
              wrapper="b"
              loop={Infinity}
            />
            <span className="text-4xl lg:text-7xl text-figma-300 font-bold">
              {' '}
              Out Of This World{' '}
              <span className="lg:hidden text-4xl text-figma-300 font-bold">
                NFTs
              </span>
            </span>
          </h2>
          <h2 className="text-4xl lg:text-7xl text-figma-300 font-bold mt-4 hidden lg:block">
            NFTs
          </h2>
        </div>
        <div className="mt-16 lg:mt-24">
          <div className="mt-7">
            <Steps
              logo="lock"
              text="Connect with NEAR Wallet"
              extra="and start interacting!"
            />
          </div>
          <div className="mt-7">
            <Steps logo="check" text="Find your favorite NFT and buy it" />
          </div>
          <div className="mt-7">
            <Steps
              logo="crypto"
              text="Don't want it anymore?"
              extra="Sell it!"
            />
          </div>
          <FAQ></FAQ>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
