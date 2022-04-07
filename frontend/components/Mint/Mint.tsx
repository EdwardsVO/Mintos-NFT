import React from 'react';
import MintForm from './MintForm';

export default function Mint() {
  return (
    <div className="p-4">
      <div>
        <img src="/logo.png" alt="logo" className="w-36" />
      </div>
      <div className="mt-5">
        <h2 className="text-figma-100 font-semibold text-xl">Mint NFT</h2>
      </div>
      <div className="mt-3">
        <MintForm />
      </div>
    </div>
  );
}
