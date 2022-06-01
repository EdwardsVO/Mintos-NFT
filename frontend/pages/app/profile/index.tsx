import React from 'react';
import Layout from '../../../components/Layout';
import Profile from '../../../components/Profile/Profile';
import useUser from '../../../hooks/useUser';
import { Seo } from '../../../components/Seo/Seo';
import { useNear } from '../../../hooks/useNear';

export default function index() {
  const [user] = useUser();
  const [nearContext] = useNear();
  const logIn = async () => {
    await nearContext.walletConnection.requestSignIn();
  };

  return (
    <Layout>

      <Seo
        metaTitle="My NFTs"
        metaDescription="My profile screen"
        shareImage="/logo.png"
      />

      {user ? (
        <div>
          <Profile />
        </div>
      ) : (
        <div className="w-full min-h-screen items-center flex justify-center bg-white">
          <button title="Connect..." onClick={logIn}>
            <img src="/near.png" alt="" className="w-full" />
          </button>
        </div>
      )}
    </Layout>
  );
}
