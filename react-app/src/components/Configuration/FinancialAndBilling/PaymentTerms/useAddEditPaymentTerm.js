import { useState, useEffect } from 'react';

const useAddEditPaymentTerm = (initialData, onSave) => {
  const [termData, setTermData] = useState({});

  useEffect(() => {
    // When initialData changes (i.e., a new item is selected), reset the form state
    setTermData(initialData || {});
  }, [initialData]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setTermData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(termData);
  };

  return {
    termData,
    handleFieldChange,
    handleSubmit,
  };
};

export default useAddEditPaymentTerm;
