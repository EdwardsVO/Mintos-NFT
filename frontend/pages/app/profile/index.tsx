import React from 'react';
import Layout from '../../../components/Layout';
import Profile from '../../../components/Profile/Profile';
import useUser from '../../../hooks/useUser';

export default function index() {
  const [user] = useUser();


  return (
    <Layout>
      {user ?
        <div>
          <Profile />
        </div>
        :
        <div className='h-screen'>
          Connect your wallet please...
        </div>
      }
    </Layout>
  );
}
