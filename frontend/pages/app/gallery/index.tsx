import React from 'react';
import Category from '../../../components/Category/Category';
import MobileNav from '../../../components/common/MobileNav';
import Layout from '../../../components/Layout';
import NFTGalleryPreview from '../../../components/NFT/NFTGalleryPreview';
import SearchBar from '../../../components/Searchbar/SearchBar';

export default function Gallery() {
  const galleryData = [
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
    <Layout>
      <div className="min-h-screen min-w-full mb-20">
        <div className="p-4">
          <div className="">
            <img src="/logo.png" alt="logo" className="w-36" />
          </div>
          <div className="mt-6">
            <SearchBar />
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
            {galleryData.map((nft, i) => (
              <NFTGalleryPreview key={i} data={nft} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
