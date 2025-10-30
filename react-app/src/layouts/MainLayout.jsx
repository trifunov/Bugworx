import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import ConfigurationSidebar from './SidebarConfiguration/SidebarConfiguration';
import Footer from './Footer';
import { useEffect } from 'react';
import useSidebar from './Sidebar/useSidebar';
import useConfigurationSidebar from './SidebarConfiguration/useSidebarConfiguration';
import { BreadcrumbProvider } from '../contexts/BreadcrumbContext';
import Breadcrumb from '../components/Common/Breadcrumb';

const MainLayout = () => {
  const { showSidebar } = useSidebar();
  const { showConfigurationSidebar } = useConfigurationSidebar();

  return (
    <BreadcrumbProvider>
      <div id="layout-wrapper">
        <Header />
        {showSidebar && <Sidebar />}
        {showConfigurationSidebar && <ConfigurationSidebar />}

        <div className={showSidebar || showConfigurationSidebar ? "main-content" : "main-content main-content-no-margin"}>
          <div className="page-content">
            {/* <Breadcrumb /> */}
            <div className="container-fluid">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </BreadcrumbProvider>
  );
};

export default MainLayout;