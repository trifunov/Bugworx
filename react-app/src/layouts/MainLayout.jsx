import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import ConfigurationSidebar from './SidebarConfiguration/SidebarConfiguration';
import Footer from './Footer';
import useSidebar from './Sidebar/useSidebar';
import useConfigurationSidebar from './SidebarConfiguration/useSidebarConfiguration';

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