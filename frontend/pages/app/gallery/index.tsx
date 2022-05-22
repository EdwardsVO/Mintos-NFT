import React from 'react';
import GalleryInfo from '../../../components/Gallery/GalleryInfo';
import Layout from '../../../components/Layout';
import { Seo } from '../../../components/Seo/Seo';

export default function GalleryPage() {
  return (
    <Layout>
      <Seo
        metaTitle="NFT Gallery"
        metaDescription="A list of all available NFTs"
        shareImage="/logo.png"
      />
      <GalleryInfo />
    </Layout>
  );
}
