import React from 'react';
import Category from '../Category/Category';
import NFTPreview from '../NFT/NFTPreview';
import SearchBar from '../Searchbar/SearchBar';

export default function Landing() {
  const categories = [
    {
      _id: 0,
      title: 'Comming Soon',
      availableNfts: 0,
      banner: '/123123123.png',
    },
    {
      _id: 1,
      title: 'Comming Soon',
      availableNfts: 0,
      banner: '/123123123.png',
    },
    {
      _id: 2,
      title: 'Comming Soon',
      availableNfts: 0,
      banner: '/123123123.png',
    },
    {
      _id: 3,
      title: 'Comming Soon',
      availableNfts: 0,
      banner: '/123123123.png',
    },
  ];

  const collections = [
    {
      _id: 1,
      title: 'Comming Soon',
      sold: 134,
      banner: '/123123123.png',
    },
    {
      _id: 2,
      title: 'Comming Soon',
      sold: 876,
      banner: '/123123123.png',
    },
  ];
  return (
    <div className="min-h-screen min-w-full mb-20">
      <div className="p-4">
        <div className="mt-2 lg:hidden">
          <SearchBar />
        </div>
        <div className='flex flex-col align-middle items-center mb-5 lg:items-start'>
          <h2 className="px-4 text-3xl font-semibold p-6 lg:text-5xl text-figma-400">
            Last Collections
          </h2>
          <div className='font-thin text-figma-900 text-2xl lg:px-4 lg:text-5xl'>Comming Soon</div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, i) => (
            <NFTPreview key={i} data={category} />
          ))}
        </div>
        <div className="mt-5">
          <div className='flex flex-col align-middle items-center lg:items-start mb-5'>
            <h2 className="px-4 text-3xl font-semibold p-6 lg:text-5xl text-figma-400">
              Top Selling Collections
            </h2>
            <div className='font-thin text-figma-900 text-2xl lg:px-4 lg:text-5xl'>Comming Soon</div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {collections.map((collection, i) => (
              <NFTPreview key={i} data={collection} isCollection />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
