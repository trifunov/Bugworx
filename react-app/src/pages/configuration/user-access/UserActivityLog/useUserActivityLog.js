import { useState, useEffect } from 'react';
import { getActivityLogs, addActivityLog, clearActivityLogs } from '../../../../utils/localStorage';

export const useUserActivityLog = () => {
  const [logs, setLogs] = useState(getActivityLogs());

  useEffect(() => {
    setLogs(getActivityLogs());
  }, []);

  const handleAddLog = (action, details = '') => {
    const entry = addActivityLog({ action, details });
    setLogs(prev => [entry, ...prev]);
  };

  const handleClear = () => {
    clearActivityLogs();
    setLogs([]);
  };

  return {
    logs,
    addLog: handleAddLog,
    clear: handleClear,
  };
};