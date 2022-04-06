import React, { Children } from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import MobileNav from './common/MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <Navbar />
      </div>
      {children}
      {/* Mobile navs goes on the footer of the page, so no footer will be shown on this screen size. */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
