import { useState } from 'react';

const useViewReports = (customerId) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSelectedReportType(null);
    setDateRange({ startDate: '', endDate: '' });
  };

  const selectReportType = (reportType) => {
    setSelectedReportType(reportType);
  };

  const updateDateRange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateReport = async (onGenerateCallback) => {
    if (onGenerateCallback && selectedReportType) {
      await onGenerateCallback({
        customerId,
        reportType: selectedReportType,
        ...dateRange
      });
    }
  };

  return {
    isOpen,
    selectedReportType,
    dateRange,
    open,
    close,
    selectReportType,
    updateDateRange,
    generateReport
  };
};

export default useViewReports;
