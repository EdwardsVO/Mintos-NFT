import React from 'react';
import Layout from '../../../components/Layout';
import Profile from '../../../components/Profile/Profile';
import useUser from '../../../hooks/useUser';
import { Seo } from '../../../components/Seo/Seo';

export default function index() {
  const [user] = useUser();

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
        <div className="h-screen">Connect your wallet please...</div>
      )}
    </Layout>
  );
}
