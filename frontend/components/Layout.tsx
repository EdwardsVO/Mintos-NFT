import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import MobileNav from './common/MobileNav';
import { useNear } from '../hooks/useNear'; 
import useUser  from '../hooks/useUser';
import { initContract } from './near/near';
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [nearContext, setNearContext] = useNear();
  const [user, setUser] = useUser();

  const setNEARContext = async () => {
    const near = await initContract();
    await setNearContext(near);
    console.log("loading context");
    try {
      const userId = await near.walletConnection.getAccountId();
      if (typeof userId == "string") {
        try {
          console.log('entro al user')
          setUser(userId)
          console.log('El user es' + userId)
          return;
        } catch (e) {
          console.log(e);
          return;
        }
      }
    } catch (e) {
      console.log(e);
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
