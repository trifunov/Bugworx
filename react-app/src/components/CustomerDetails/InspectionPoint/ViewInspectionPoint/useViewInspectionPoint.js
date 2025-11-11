import { useState } from 'react';

const useViewInspectionPoint = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const open = (inspectionPoint) => {
    setData(inspectionPoint);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };

  return { isOpen, data, open, close };
};

export default useViewInspectionPoint;
