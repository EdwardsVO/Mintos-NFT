import { useRouter } from 'next/router';
import React from 'react';
import SearchBar from '../Searchbar/SearchBarDesktop';
import { useNear } from '../../hooks/useNear';
import useUser from '../../hooks/useUser';
import LogOutIcon from '../icons/LogOutIcon';
import Token from '../../models/Token';
import { initContract } from '../near/near';

export default function Navbar() {
  const router = useRouter();
  const [nearContext] = useNear();
  const [user, setUser] = useUser();
  const [tokens, setTokens] = React.useState<Array<Token>>(null);

  const currentPage = router.route;

  React.useEffect(() => {
    initSearchBar();
  }, []);

  const logIn = async () => {
    await nearContext.walletConnection.requestSignIn(
      nearContext.nearConfig.contractName
    );
  };

  const logOut = async () => {
    await setUser('');
    await nearContext.walletConnection.signOut();
  };

  const initSearchBar = async () => {
    const { contract } = await initContract();
    // @ts-ignore: Unreachable code error
    setTokens(await contract.obtener_pagina_v2({ from_index: 0, limit: 10 }));
  };

  return (
    <div className="bg-white w-full drop-shadow-md">
      <div className="flex justify-between p-4">
        <div className="mr-44">
          <img src="/logo.png" alt="logo" className="w-36" />
        </div>
        <div className="self-center">
          <div className="flex space-x-8">
            <button type="button" onClick={() => router.push('/app/')}>
              <h2
                className={`font-semibold  ${
                  currentPage === '/app'
                    ? ' underline underline-offset-8 decoration-figma-100 decoration-4'
                    : ''
                }`}
              >
                Home
              </h2>
            </button>
            <button type="button" onClick={() => router.push('/app/gallery')}>
              <h2
                className={`font-semibold ${
                  currentPage === '/app/gallery'
                    ? ' underline underline-offset-8 decoration-figma-100 decoration-4'
                    : ''
                }`}
              >
                Gallery
              </h2>
            </button>
            <button type="button" onClick={() => router.push('/app/mint')}>
              <h2
                className={`font-semibold  ${
                  currentPage === '/app/mint'
                    ? ' underline underline-offset-8 decoration-figma-100 decoration-4'
                    : ''
                }`}
              >
                Mint
              </h2>
            </button>
            <button type="button" onClick={() => router.push('/app/mynfts')}>
              <h2
                className={`font-semibold ${
                  currentPage === '/app/profile'
                    ? ' underline underline-offset-8 decoration-figma-100 decoration-4'
                    : ''
                }`}
              >
                My NFTs
              </h2>
            </button>
          </div>
        </div>
        <div className="self-center">
          <SearchBar
            className="rounded-lg border-2 h-8 py-px px-3"
            tokens={tokens}
          />
        </div>
        <div>
          {user == '' ? (
            <button
              type="button"
              className="p-3 bg-figma-100 rounded-lg hover:bg-blue-800 text-white"
              onClick={() => {
                logIn();
              }}
            >
              Connect
            </button>
          ) : (
            <div className="p-3 bg-figma-100 rounded-lg text-white flex justify-between align-middle items-center font-bold">
              <div className="h-full">{user}</div>
              <button
                className=" hover:text-gray-400 text-white w-5 h-full ml-3"
                onClick={() => {
                  logOut();
                }}
              >
                <LogOutIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
