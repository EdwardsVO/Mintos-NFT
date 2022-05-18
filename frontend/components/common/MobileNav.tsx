import { useRouter } from 'next/router';
import React from 'react';

import useUser from '../../hooks/useUser';
import { useNear } from '../../hooks/useNear';
import { LogOutModal } from '../modal/LogOutModal';

export default function MobileNav() {
  const router = useRouter();
  const [user] = useUser();
  const [nearContext] = useNear();
  const [showModal, setShowModal] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const currentPage = router.route;

  const logIn = async () => {
    await nearContext.walletConnection.requestSignIn(
      nearContext.nearConfig.contractName[0]
    );
  };

  function onMenuClick() {
    setShowMenu(!showMenu);
  }
  function onClick() {
    setShowModal(true);
  }

  return (
    <div className="w-full sticky px-6 rounded-t-2xl">
      <div className="flex w-full justify-between items-center mt-3">
        <div
          className={`menu-btn w-0 ${showMenu ? 'open' : ''}`}
          onClick={onMenuClick}
        >
          <div className="menu-btn__burger"></div>
        </div>

        <div className="lg:hidden" onClick={() => router.push('/app')}>
          <img src="/logo.png" alt="logo" className="w-36" />
        </div>
        <div>
          {user ? (
            <div className="bg-figma-100 rounded-full text-figma-300 p-4"></div>
          ) : (
            <div>
              <button
                className="bg-figma-100 px-2 py-1.5 text-figma-300 drop-shadow-md rounded-lg"
                onClick={logIn}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      {showMenu ? (
        <div className="bg-figma-200 text-gray-600 min-h-screen flex justify-center text-lg">
          <div className="mt-4">
            <h2
              className={`mt-2 ${
                currentPage === '/app'
                  ? 'text-figma-100 underline underline-offset-8 decoration-figma-100 decoration-4'
                  : ''
              }`}
              onClick={() => router.push('/app')}
            >
              Home
            </h2>
            <h2
              className={`mt-2 ${
                currentPage === '/app/gallery'
                  ? 'text-figma-100 underline underline-offset-8 decoration-figma-100 decoration-4'
                  : ''
              }`}
              onClick={() => router.push('/app/gallery')}
            >
              Gallery
            </h2>
            <h2
              className={`mt-2 ${
                currentPage === '/app/mint'
                  ? 'text-figma-100 underline underline-offset-8 decoration-figma-100 decoration-4'
                  : ''
              }`}
              onClick={() => router.push('/app/mint')}
            >
              Mint
            </h2>
            <h2
              className={`mt-2 ${
                currentPage === '/app/profile'
                  ? 'text-figma-100 underline underline-offset-8 decoration-figma-100 decoration-4'
                  : ''
              }`}
              onClick={() => router.push('/app/profile')}
            >
              Profile
            </h2>
          </div>
        </div>
      ) : null}
      <LogOutModal setOpen={setShowModal} isOpen={showModal} />
    </div>
  );
}
