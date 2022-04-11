import React from 'react';
import Category from '../Category/Category';
import NFTPreview from '../NFT/NFTPreview';
import SearchBar from '../Searchbar/SearchBar';

export default function Landing() {
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

  const collections = [
    {
      _id: 1,
      title: 'NEARliens',
      sold: 48,
      banner: '/123123123.png',
    },
    {
      _id: 2,
      title: 'Collection2',
      sold: 30,
      banner: '/123123123.png',
    },
  ];
  return (
    <div className="min-h-screen min-w-full mb-20">
      <div className="p-4">
        <div className="lg:hidden">
          <img src="/logo.png" alt="logo" className="w-36" />
        </div>
        <div className="mt-6 lg:hidden">
          <SearchBar />
        </div>
        <div className="mt-5 flex space-x-4">
          {categories.map((category, i) => (
            <Category categories={category} key={i} />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, i) => (
            <NFTPreview key={i} data={category} />
          ))}
        </div>
        <div className="mt-5">
          <h2 className="px-4 font-semibold text-lg">
            Top Selling Collections
          </h2>
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
