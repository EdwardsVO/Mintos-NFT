import React from 'react';
import Landing from '../../components/LandingdApp/Landing';
import Layout from '../../components/Layout';
import { Seo } from '../../components/Seo/Seo';

export default function LandingPage() {
  return (
    <Layout>
      <Seo
        metaTitle="NFT Gallery"
        metaDescription="A list of all available NFTs"
        shareImage="/logo.png"
      />
      <Landing />
    </Layout>
  );
}
