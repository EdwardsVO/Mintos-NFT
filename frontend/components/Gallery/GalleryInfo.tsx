import React from 'react';
import Category from '../Category/Category';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';
import SearchBarDesktop from '../Searchbar/SearchBarDesktop';
import { useNear } from '../../hooks/useNear';
import Token from '../../models/Token';
import { initContract } from '../near/near';
import SearchBar from '../Searchbar/SearchBar';

export default function GalleryInfo() {
  const [tokens, setTokens] = React.useState<Array<Token>>(null);
  const [searchBarTokens, setSearchBarTokens] =
    React.useState<Array<Token>>(null);
  const [page, setPage] = React.useState<number>(0);

  const getGalleryData = async () => {
    const { contracts } = await initContract();
    // @ts-ignore: Unreachable code error
    setTokens(await contract.obtener_pagina_v2({ from_index: 0, limit: 12 }));
  };

  const initSearchBar = async () => {
    const { contracts } = await initContract();
    setSearchBarTokens(
      // @ts-ignore: Unreachable code error
      await contract.obtener_pagina_v2({ from_index: 0, limit: 10 })
    );
  };

  React.useEffect(() => {
    //getGalleryData();
    //initSearchBar();
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
          <div className="lg:hidden">
            <img src="/logo.png" alt="logo" className="w-36" />
          </div>
          <div className="mt-6 lg:hidden w-full">
            <SearchBarDesktop
              className="rounded-lg border-2 h-8 py-px px-3 w-full"
              tokens={tokens}
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
            {tokens ? (
              tokens.map((nft, i) => <NFTGalleryPreview key={i} data={nft} />)
            ) : (
              <div>Nothing to show yet...</div>
            )}
          </div>

          {/* WE NEED TO CREATE A PAGINATOR TO setPage */}
        </div>
      </div>
    </div>
  );
}
