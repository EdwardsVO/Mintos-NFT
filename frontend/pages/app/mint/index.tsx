import React from 'react';
import Layout from '../../../components/Layout';
import Mint from '../../../components/Mint/Mint';
import { Seo } from '../../../components/Seo/Seo';

export default function MintPage() {
  return (
    <Layout>
      <Seo
        metaTitle="Mint My NFT"
        metaDescription="Mint your NFT using our platform"
        shareImage="/logo.png"
      />
      <div className="h-screen">
        <Mint />
      </div>
    </Layout>
  );
}
