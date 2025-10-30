import React, { createContext, useState, useContext } from 'react';

const BreadcrumbContext = createContext();

export const useBreadcrumbs = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const value = { breadcrumbs, setBreadcrumbs };

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};