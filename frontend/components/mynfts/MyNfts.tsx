import React from 'react';
import Token from '../../models/Token';
import { initContract } from '../near/near';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';

export default function MyNfts() {
  const [tokens, setTokens] = React.useState<Token[]>(null);
  const [owner, setOwner] = React.useState('');

  const getContractData = async () => {
    const { contract } = await initContract();
    // @ts-ignore: Unreachable code error
    setTokens(await contract.obtener_pagina_v2({ from_index: 0, limit: 200 }));
    setOwner(await contract.account.accountId);
  };

  const mockData = [
    {
      token_id: 0,
      token_owner_id: 'mzterdox.testnet',
      metadata: {
        name: 'token name',
        description: 'token description',
        price: '6',
        creator_id: 'mzterdox.testnet',
        media: 'mediamediamedia',
        media_hash: 'mediahasmhmediahashmediahash',
      },
    },
    {
      token_id: 1,
      token_owner_id: 'mzterdox.testnet',
      metadata: {
        name: 'token name',
        description: 'token description',
        price: '6',
        creator_id: 'mzterdox.testnet',
        media: 'mediamediamedia',
        media_hash: 'mediahasmhmediahashmediahash',
      },
    },
    {
      token_id: 2,
      token_owner_id: 'mzterdox.testnet',
      metadata: {
        name: 'token name',
        description: 'token description',
        price: '6',
        creator_id: 'mzterdox.testnet',
        media: 'mediamediamedia',
        media_hash: 'mediahasmhmediahashmediahash',
      },
    },
  ];

  React.useEffect(() => {
    getContractData();
    console.log(tokens);
  }, []);
  return (
    <div className="min-h-screen min-w-full p-4">
      <h2>{owner}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
        {tokens && owner ? (
          tokens.map((nft, id) => {
            nft?.owner_id !== owner ? 'yee' : '';
          })
        ) : (
          <div>Nothing to show yet...</div>
        )}
      </div>
    </div>
  );
}
