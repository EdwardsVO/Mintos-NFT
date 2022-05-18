import React from 'react';
import MintForm from './MintForm';
import useUser from '../../hooks/useUser';

export default function Mint() {
  const [user] = useUser();

  return (
    <div className="p-4">
      <div className="mt-5">
        <h2 className="text-figma-100 font-semibold text-xl">Mint NFT</h2>
      </div>
      <div className="mt-3">
        {user != '' ? (
          <MintForm />
        ) : (
          <div className="h-screen">Please connect your wallet...</div>
        )}
      </div>
    </div>
  );
}
