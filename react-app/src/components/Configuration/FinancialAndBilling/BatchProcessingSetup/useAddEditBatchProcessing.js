import { useState, useEffect } from 'react';

const useAddEditBatchProcessing = (initialData, onSave) => {
  const [setupData, setSetupData] = useState({});

  useEffect(() => {
    setSetupData(initialData || {});
  }, [initialData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setSetupData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(setupData);
  };

  return {
    setupData,
    handleFieldChange,
    handleSubmit,
  };
};

export default useAddEditBatchProcessing;
