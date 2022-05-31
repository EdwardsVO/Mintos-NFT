import React from 'react';
import Layout from '../../../components/Layout';
import Mint from '../../../components/Mint/Mint';
import { Seo } from '../../../components/Seo/Seo';
import { useNear } from '../../../hooks/useNear';
import useUser from '../../../hooks/useUser';

export default function MintPage() {
  const [user] = useUser();
  const [nearContext] = useNear();

  const logIn = async () => {
    await nearContext.walletConnection.requestSignIn();
  };
  return (
    <Layout>
      <Seo
        metaTitle="Mint My NFT"
        metaDescription="Mint your NFT using our platform"
        shareImage="/logo.png"
      />
      {user ? (
        <div>
          <Mint />
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
