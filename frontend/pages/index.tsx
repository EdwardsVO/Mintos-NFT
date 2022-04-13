import React from 'react';
import Landing from '../components/Landing/Landing';
import Layout from '../components/Landing/Layout';

export default function index() {
  return (
    <div className="bg-bg-2 lg:w-full lg:h-full lg:bg-cover lg:min-h-screen bg-cover min-h-screen min-w-screen">
      <Layout>
        <Landing />
      </Layout>
    </div>
  );
}
