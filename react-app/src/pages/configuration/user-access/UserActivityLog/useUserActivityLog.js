import { useState, useEffect } from 'react';
import { getActivityLogs, clearActivityLogs } from '../../../../utils/localStorage';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

export const useUserActivityLog = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const [logs, setLogs] = useState(getActivityLogs());

  useEffect(() => {
    setLogs(getActivityLogs());
    setPageSubHeader({
      title: 'User Activity Log',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration/general' },
        { label: 'User Access', path: '/configuration/user-access' },
        { label: 'User Activity Log', isActive: true },
      ],
    });
  }, []);

  const handleAddLog = (action, details = '') => {
    setLogs((prev) => [{ id: new Date().getTime(), timestamp: new Date().toISOString(), user: '', action, details }, ...prev]);
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
