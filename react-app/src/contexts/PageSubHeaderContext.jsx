// filepath: c:\Softela\Softela.Dashboard\react-app\src\contexts\PageSubHeaderContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageSubHeaderContext = createContext();

export const usePageSubHeader = () => useContext(PageSubHeaderContext);

export const PageSubHeaderProvider = ({ children }) => {
  const [pageSubHeader, setPageSubHeader] = useState({
    title: '',
    breadcrumbs: []
  });
  const location = useLocation();

  // Reset the sub-header automatically on every route change
  useEffect(() => {
    setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [location.pathname]); // This effect runs when the path changes

  const value = { pageSubHeader, setPageSubHeader };

  return (
    <PageSubHeaderContext.Provider value={value}>
      {children}
    </PageSubHeaderContext.Provider>
  );
};