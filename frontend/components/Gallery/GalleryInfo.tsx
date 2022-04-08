import React from 'react';
import Category from '../Category/Category';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';
import SearchBarDesktop from '../Searchbar/SearchBarDesktop';
import { useNear } from '../../hooks/useNear';
import Token from '../../models/Token';

export default function GalleryInfo() {
  const [nearContext] = useNear();
  const [tokens, setTokens] = React.useState<Array<Token>>(null);
  const [page, setPage] = React.useState<number>(0);

  const galleryDataMock = [
    {
      _id: 0,
      title: 'Lion King',
      price: 10,
      collection: 'Collection Name',
      banner: '/Lion.jpg',
      owner: 'mzterdox.near',
    },
    {
      _id: 1,
      title: 'NEARLien 0',
      price: 10,
      collection: 'Collection Name',
      banner: '/12.png',
      owner: 'mzterdox.near',
    },
    {
      _id: 2,
      title: 'Blitzcreg Bop',
      price: 10,
      collection: 'Collection Name',
      banner: '/blitz.png',
      owner: 'mzterdox.near',
    },
    {
      _id: 3,
      title: 'Yakuza Kuza',
      price: 10,
      collection: 'Collection Name',
      banner: '/yakuza.png',
      owner: 'mzterdox.near',
    },
  ];

  const getGalleryData = () => {
    nearContext.contract
    // @ts-ignore: Unreachable code error
      .obtener_pagina_v2({ from_index: page, limit: 10 })
      .then(setTokens); //limit:10 test purposes. Find an harmonic number for screens
  };

  React.useEffect(() => {
    getGalleryData();
  }, []);

  const categories = [
    {
      _id: 0,
      title: 'All',
      availableNfts: 99,
      banner: '/123123123.png',
    },
    {
      _id: 1,
      title: 'Aliens',
      availableNfts: 32,
      banner: '/123123123.png',
    },
    {
      _id: 2,
      title: 'Animals',
      availableNfts: 43,
      banner: '/123123123.png',
    },
    {
      _id: 3,
      title: 'People',
      availableNfts: 12,
      banner: '/123123123.png',
    },
  ];
  return (
    <div>
      <div className="min-h-screen min-w-full mb-20">
        <div className="p-4">
          <div className="">
            <img src="/logo.png" alt="logo" className="w-36" />
          </div>
          <div className="mt-6">
            <SearchBarDesktop
              className="rounded-lg border-2 h-8 py-px px-3"
              data={galleryDataMock}
            />
          </div>
          <div className="mt-5 flex space-x-4">
            {categories.map((category, i) => (
              <Category categories={category} key={i} />
            ))}
          </div>
          <h2 className="text-figma-400 font-semibold text-xl mt-5">
            NFT Gallery
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {tokens ? (
            tokens.map((nft, i) => (
              <NFTGalleryPreview key={i} data={nft} />
            ))) : (
              <div>
                Nothing to show yet...
              </div>
            )
            }
          </div>
          {/* GET TOKENS TEST BUTTON */}
          <button
            className="bg-red-500 p-9"
            onClick={() => {
              console.log(tokens);
            }}
          >
            TEST RESULT
          </button>
          {/* WE NEED TO CREATE A PAGINATOR TO setPage */}
        </div>
      </div>
    </div>
  );
}
