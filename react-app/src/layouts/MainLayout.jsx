import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useEffect } from 'react';

const MainLayout = () => {
  const location = useLocation();

  // Only show sidebar when viewing a specific customer (account detail page)
  const showSidebar = location.pathname.startsWith('/accounts/') && location.pathname !== '/accounts';

  useEffect(() => {
    // Handle vertical menu button click (sidebar toggle)
    const handleMenuToggle = () => {
      if (!showSidebar) return; // Don't toggle sidebar when not on account detail

      document.body.classList.toggle('sidebar-enable');

      const windowWidth = window.innerWidth;
      if (windowWidth >= 992) {
        document.body.classList.toggle('vertical-collpsed');
      } else {
        document.body.classList.remove('vertical-collpsed');
      }
    };

    const menuButton = document.getElementById('vertical-menu-btn');
    if (menuButton && showSidebar) {
      menuButton.addEventListener('click', handleMenuToggle);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener('click', handleMenuToggle);
      }
    };
  }, [showSidebar]);

  return (
    <div id="layout-wrapper">
      <Header />
      {showSidebar && <Sidebar />}

      <div className={showSidebar ? "main-content" : "main-content main-content-no-margin"}>
        <div className="page-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
