import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import ModulesSidebar from './Sidebar/ModulesSidebar';
import ConfigurationSidebar from './SidebarConfiguration/SidebarConfiguration';
import Footer from './Footer';
import useSidebar from './Sidebar/useSidebar';
import useConfigurationSidebar from './SidebarConfiguration/useSidebarConfiguration';
import { PageSubHeaderProvider } from '../contexts/PageSubHeaderContext';
import PageSubHeader from '../components/Common/PageSubHeader';
import { EditableFormProvider } from '../contexts/EditableFormContext';
import EditableForms from './EditableForms/EditableForms';

const MainLayout = () => {
  const { showSidebar, showModulesSidebar, showCustomerSidebar } = useSidebar();
  const { showConfigurationSidebar } = useConfigurationSidebar();

  return (
    <PageSubHeaderProvider>
      <EditableFormProvider>
        <div id="layout-wrapper">
          <Header />
          <EditableForms />
          {showModulesSidebar && <ModulesSidebar />}
          {showCustomerSidebar && <Sidebar />}
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
      </EditableFormProvider>
    </PageSubHeaderProvider>
  );
};

export default MainLayout;