import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import MobileNav from './common/MobileNav';
import { useNear } from '../hooks/useNear';
import useUser from '../hooks/useUser';
import { initContract } from './near/near';
import User from '../models/User';
import { toNEAR } from './utils'

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [nearContext, setNearContext] = useNear();
  const [user, setUser] = useUser();

  const setNEARContext = async () => {
    const near = await initContract();
    await setNearContext(near);
    try {
      const userId = await near.walletConnection.getAccountId();
      const userBalance = (await near.walletConnection.account().state()).amount;
      const balance = '0'
      if (typeof userId == 'string') {

        const user: User = {
          username: userId,
          balance: toNEAR(userBalance).toString(),
        }

        try {
          setUser(user);
          return;
        } catch (e) {
          return;
        }
      }
    } catch (e) {
      setUser(null);
    }
  };

  React.useEffect(() => {
    if (!nearContext && !user) {
      setNEARContext();
      return;
    }
    return;
  }, [nearContext]);

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div className="pt-16">{children}</div>
      {/* Mobile navs goes on the footer of the page, so no footer will be shown on this screen size. */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
