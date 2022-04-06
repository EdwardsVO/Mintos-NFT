import React, { Children } from 'react'
import Navbar from './common/Navbar';
import Footer from './common/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({children}: LayoutProps) {
  return (
    <div className='w-full'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout