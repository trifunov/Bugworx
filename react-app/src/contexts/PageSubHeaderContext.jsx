import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageSubHeaderContext = createContext();

export const usePageSubHeader = () => useContext(PageSubHeaderContext);

export const PageSubHeaderProvider = ({ children }) => {
  const [pageSubHeader, setPageSubHeader] = useState({
    title: '',
    breadcrumbs: [],
  });
  const location = useLocation();

  const value = { pageSubHeader, setPageSubHeader };

  return <PageSubHeaderContext.Provider value={value}>{children}</PageSubHeaderContext.Provider>;
};
