import React from 'react';
import Category from '../Category/Category';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';
import SearchBarDesktop from '../Searchbar/SearchBarDesktop';
import Token from '../../models/Token';
import { initContract } from '../near/near';
import { ViewGridIcon, ViewListIcon } from '../icons';

export default function GalleryInfo() {
  const [tokens, setTokens] = React.useState<Array<Token>>(null);
  const [searchBarTokens, setSearchBarTokens] =
    React.useState<Array<Token>>(null);
  const [page, setPage] = React.useState<number>(0);
  const [view, setView] = React.useState('grid');

  const getGalleryData = async () => {
    const { contracts } = await initContract();
    // @ts-ignore: Unreachable code error
    // setTokens(await contract.obtener_pagina_v2({ from_index: 0, limit: 16 }));
  };

  const initSearchBar = async () => {
    const { contracts } = await initContract();
    // setSearchBarTokens(
    //   // @ts-ignore: Unreachable code error
    //   await contract.obtener_pagina_v2({ from_index: 0, limit: 10 })
    // );
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
              tokens={searchBarTokens}
            />
          </div>
          <div className="mt-5 flex space-x-4">
            {categories.map((category, i) => (
              <Category categories={category} key={i} />
            ))}
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <h2 className="text-figma-400 font-semibold text-xl">
                NFT Gallery
              </h2>
            </div>
            <div className="self-center flex space-x-2 md:hidden">
              <button
                type="button"
                onClick={() => setView('grid')}
                className={`${view === 'grid' ? 'text-figma-100' : ''}`}
              >
                <ViewGridIcon className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className={`${view === 'grid' ? '' : 'text-figma-100'}`}
              >
                <ViewListIcon className="w-7 h-7" />
              </button>
            </div>
          </div>
          <div
            className={`mt-3 ${
              view === 'grid'
                ? 'grid grid-cols-2 gap-3 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between'
                : 'text-center md:grid md:grid-cols-3 md:gap-3 lg:grid lg:grid-cols-5 lg:gap-6'
            } text-center`}
          >
            {tokens ? (
              tokens.map((nft, i) => (
                <div className={`${view === 'grid' ? '' : 'py-4 md:py-0'}`}>
                  <NFTGalleryPreview
                    key={i}
                    data={nft}
                    className={`mt-3 ${
                      view === 'grid'
                        ? 'w-36 h-36 lg:w-72 lg:h-72 md:w-52 md:h-52 '
                        : 'w-72 h-72 md:w-52 md:h-52 lg:h-72 lg:w-72 '
                    }`}
                  />
                </div>
              ))
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
