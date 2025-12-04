import { useState, useEffect } from 'react';
import { getBackups, saveBackups } from '../../../../utils/localStorage';

// Helper to format bytes
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const useBackupAndRestore = () => {
  const [backups, setBackups] = useState(getBackups());

  useEffect(() => {
    saveBackups(backups);
  }, [backups]);

  const createBackup = () => {
    const backupData = { ...localStorage };
    const backupString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([backupString], { type: 'application/json' });
    const date = new Date();
    const newBackup = {
      id: date.getTime().toString(),
      name: `backup-${date.toISOString().split('T')[0]}-${date.getTime()}.json`,
      date: date.toISOString(),
      size: formatBytes(blob.size),
      content: backupString,
    };
    setBackups((prev) => [newBackup, ...prev]);
    alert('Backup created successfully!');
  };

  const downloadBackup = (id) => {
    const backup = backups.find((b) => b.id === id);
    if (!backup) {
      alert('Backup not found!');
      return;
    }
    const blob = new Blob([backup.content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = backup.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const restoreBackup = (id) => {
    if (!window.confirm('Are you sure you want to restore this backup? This will overwrite all current data.')) return;
    const backup = backups.find((b) => b.id === id);
    if (!backup) {
      alert('Backup not found!');
      return;
    }
    try {
      const data = JSON.parse(backup.content);
      localStorage.clear();
      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
      });
      alert('Restore successful! The application will now reload.');
      window.location.reload();
    } catch (error) {
      alert('Failed to restore backup. The file may be corrupt.');
      console.error('Restore error:', error);
    }
  };

  const deleteBackup = (id) => {
    if (!window.confirm('Are you sure you want to delete this backup?')) return;
    setBackups((prev) => prev.filter((b) => b.id !== id));
  };

  const handleBackupUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      try {
        JSON.parse(content); // Validate JSON
        const date = new Date();
        const newBackup = {
          id: date.getTime().toString(),
          name: file.name,
          date: date.toISOString(),
          size: formatBytes(file.size),
          content: content,
        };
        setBackups((prev) => [newBackup, ...prev]);
        alert('Backup uploaded successfully.');
      } catch (error) {
        alert('Invalid backup file. Please upload a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return { backups, createBackup, downloadBackup, restoreBackup, deleteBackup, handleBackupUpload };
};
