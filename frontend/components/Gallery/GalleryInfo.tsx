import React from 'react';
import Category from '../Category/Category';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';
import SearchBarDesktop from '../Searchbar/SearchBarDesktop';
import { useNear } from '../../hooks/useNear';
import Token from '../../models/Token';

export default function GalleryInfo() {
  const [nearContext] = useNear();
  const [tokens, setTokens] = React.useState<Array<Token>>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [tokensPerPage] = React.useState(4);
  const [indexFirstNFT, setIndexFirstNFT] = React.useState(0);
  // const [currentNFTs, setCurrentNFTs] = React.useState<Token[]>();

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

  React.useEffect(() => {
    const getGalleryData = async () => {
      setLoading(true);
      await nearContext.contract
        // @ts-ignore: Unreachable code error
        .obtener_pagina_v2({
          from_index: indexOfFirstNFT,
          limit: tokensPerPage,
        })
        .then(setTokens);
      setLoading(false);
    };
    getGalleryData();
    // indexOfFirstNFT();
    console.log(tokens);
  }, [currentPage, indexFirstNFT]);

  const indexOfLastNFT = currentPage * tokensPerPage;
  // const indexOfFirstNFT = indexOfLastNFT - tokensPerPage;
  const indexOfFirstNFT = currentPage * tokensPerPage - 1;

  // const indexOfFirstNFT = () => {
  //   if (currentPage - tokensPerPage < 0) {
  //     setIndexFirstNFT(0);
  //   } else {
  //     setIndexFirstNFT((currentPage * tokensPerPage) -1);
  //   }
  // };
  const changePage = () => {
    setCurrentPage(currentPage + 1);
    setIndexFirstNFT(indexOfFirstNFT);
    console.log(currentPage);
    console.log(indexFirstNFT);
  };

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
          <div className="lg:hidden">
            <img src="/logo.png" alt="logo" className="w-36" />
          </div>
          <div className="mt-6 lg:hidden">
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
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
            {tokens && !loading ? (
              tokens.map((nft, i) => <NFTGalleryPreview key={i} data={nft} />)
            ) : (
              <div>Nothing to show yet...</div>
            )}
          </div>

          {/* WE NEED TO CREATE A PAGINATOR TO setPage */}
          <button onClick={() => changePage()}>Next Page</button>
        </div>
      </div>
    </div>
  );
}
