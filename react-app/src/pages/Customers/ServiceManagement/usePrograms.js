import { useState, useEffect } from 'react';
import { getPrograms, addProgram, updateProgram } from '../../../utils/localStorage';
import useTable from '../../../components/Common/Table/useTable';
import useTableSearch from '../../../components/Common/SearchBar/useTableSearch';

const usePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const refreshPrograms = () => {
    const storedPrograms = getPrograms();
    setPrograms(storedPrograms);
  };

  useEffect(() => {
    refreshPrograms();
  }, []);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(programs, ['name', 'status']);

  const {
    data: paginatedData,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useTable(filteredItems, {
    defaultSortField: 'name',
    defaultSortDirection: 'asc',
    pageSize: 10,
  });

  const handleAddNew = () => {
    setFormData({
      id: 0,
      programName: '',
      description: '',
    });
    setFormErrors({});
    setIsOffcanvasOpen(true);
  };

  const handleEdit = (program) => {
    setFormData(program);
    setFormErrors({});
    setIsOffcanvasOpen(true);
  };

  const handleClose = () => {
    setIsOffcanvasOpen(false);
    setFormData({});
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Basic validation
    const errors = {};
    if (!formData.name) {
      errors.name = 'Program name is required.';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSaving(false);
      return;
    }

    try {
      if (formData.id && formData.id !== 0) {
        updateProgram(formData);
      } else {
        addProgram(formData);
      }
      refreshPrograms();
      handleClose();
    } catch (error) {
      setFormErrors({ submit: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    programs,
    paginatedData,
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    refreshPrograms,
    isOffcanvasOpen,
    formData,
    formErrors,
    isSaving,
    handleAddNew,
    handleEdit,
    handleClose,
    handleSave,
    handleUpdateField,
  };
};

export default usePrograms;
