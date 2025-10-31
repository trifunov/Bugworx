import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import ConfigurationSidebar from './SidebarConfiguration/SidebarConfiguration';
import Footer from './Footer';
import { useEffect } from 'react';
import useSidebar from './Sidebar/useSidebar';
import useConfigurationSidebar from './SidebarConfiguration/useSidebarConfiguration';
import { PageSubHeaderProvider } from '../contexts/PageSubHeaderContext';
import PageSubHeader from '../components/Common/PageSubHeader';

const MainLayout = () => {
  const { showSidebar } = useSidebar();
  const { showConfigurationSidebar } = useConfigurationSidebar();

  return (
    <PageSubHeaderProvider>
      <div id="layout-wrapper">
        <Header />
        {showSidebar && <Sidebar />}
        {showConfigurationSidebar && <ConfigurationSidebar />}

        <div className={showSidebar || showConfigurationSidebar ? "main-content" : "main-content main-content-no-margin"}>
          <div className="page-content">
            <div className="container-fluid">
              <PageSubHeader />
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </PageSubHeaderProvider>
  );
};

export default MainLayout;