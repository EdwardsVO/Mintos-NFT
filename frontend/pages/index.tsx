import React from 'react';
import Landing from '../components/Landing/Landing';
import Layout from '../components/Landing/Layout';
import { Seo } from '../components/Seo/Seo';

export default function index() {
  return (
    <div className="bg-bg-2 lg:w-full lg:h-full lg:bg-cover lg:min-h-screen bg-cover min-h-screen min-w-screen">
      <Layout>
        <Seo
          metaTitle="Mintos NFTs"
          metaDescription="Explore out of this wordl!"
          shareImage="/logo.png"
        />
        <Landing />
      </Layout>
    </div>
  );
}
