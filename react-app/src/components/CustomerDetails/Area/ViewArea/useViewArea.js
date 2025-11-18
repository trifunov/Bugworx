import { useState } from 'react';

const useViewArea = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const open = (area) => {
    setData(area);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };

  return { isOpen, data, open, close };
};

export default useViewArea;
