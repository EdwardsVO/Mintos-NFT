import { useRouter } from 'next/router';
import React from 'react';
import SearchBar from '../Searchbar/SearchBarDesktop';
import { useNear } from '../../hooks/useNear';
import useUser from '../../hooks/useUser';
import LogOutIcon from '../icons/LogOutIcon';
import Token from '../../models/Token';
import { toNEAR } from '../utils';
import { initContract } from '../near/near';

export default function Navbar() {
  const router = useRouter();
  const [nearContext, setNearContext] = useNear();
  const [user, setUser] = useUser();
  const [tokens, setTokens] = React.useState<Array<Token>>(null);

  const currentPage = router.route;

  const logIn = async () => {
    await nearContext.walletConnection.requestSignIn(
      nearContext.nearConfig.contractName[0]
    );
  };

  const logOut = async () => {
    await setUser(null);
    router.push('/');
    await nearContext.walletConnection.signOut();
  };


  return (
    <div className="bg-white w-full drop-shadow-md fixed z-50">
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
            <button type="button" onClick={() => router.push('/app/profile')}>
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
            <button type="button" onClick={() => router.push('/app/mint')}>
              <h2
                className={`font-bold px-4 py-2 mx-7 rounded-lg shadow-lg border-2 border-figma-900 hover:bg-figma-900 hover:text-white ${
                  currentPage === '/app/mint' ? ' bg-figma-900 text-white' : ''
                }`}
              >
                Mint My NFT
              </h2>
            </button>
          </div>
        </div>
        <div className="self-center">
          <SearchBar />
        </div>
        <div>
          {user == null ? (
            <button
              type="button"
              className="p-3 bg-figma-900 shadow-lg font-bold hover:bg-figma-100 text-white rounded-lg"
              onClick={() => {
                logIn();
              }}
            >
              Connect
            </button>
          ) : (
            <div className=" bg-figma-900 rounded-lg text-white flex justify-between align-middle items-center font-bold pr-3">
              <div className="p-3 border-gray-400 text-black border-y-2 border-l-2 rounded-tl-lg rounded-bl-lg mr-6 bg-white">
                {user.balance}Ⓝ
              </div>
              <div className=" p-3 h-full">{user.username}</div>
              <button
                className=" hover:text-gray-400 text-white w-5 h-full ml-3"
                onClick={() => {
                  logOut();
                }}
              >
                <LogOutIcon className="" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
