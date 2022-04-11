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
  const [tokens, setTokens] = React.useState<Token[]>();

  const currentPage = router.route;
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

  React.useEffect(() => {
    initContract();
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
          </div>
        </div>
        <div className="self-center">
          <SearchBar
            className="rounded-lg border-2 h-8 py-px px-3"
            data={galleryData}
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
