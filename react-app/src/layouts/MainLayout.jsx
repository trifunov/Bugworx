import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ConfigurationSidebar from './ConfigurationSidebar';
import Footer from './Footer';
import { useEffect } from 'react';
import useSidebar from '../hooks/useSidebar';
import useConfigurationSidebar from '../hooks/useConfigurationSidebar';

const MainLayout = () => {
  const { showSidebar } = useSidebar();
  const { showConfigurationSidebar } = useConfigurationSidebar();

  return (
    <div id="layout-wrapper">
      <Header />
      {showSidebar && <Sidebar />}
      {showConfigurationSidebar && <ConfigurationSidebar />}

      <div className={showSidebar || showConfigurationSidebar ? "main-content" : "main-content main-content-no-margin"}>
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