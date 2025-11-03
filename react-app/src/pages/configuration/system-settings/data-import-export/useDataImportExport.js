import { useRef } from 'react';
import * as ls from '../../../../utils/localStorage'
import { useAudit } from '../../../../contexts/AuditContext'

export const useDataImportExport = () => {
    const { pushAudit } = useAudit();
    const importEntityRef = useRef(null);
    const exportEntityRef = useRef(null);
    const exportFormatRef = useRef(null);

    const handleImportFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            const content = e.target.result;
            const entity = importEntityRef.current?.value || 'Customers';
            const key = `import_${entity}`;
            const payload = { fileName: file.name, content, date: new Date().toISOString() };
            ls.setToStorage(key, payload);
            pushAudit('admin', 'Import', entity, file.name);
            alert(`Imported ${file.name} for ${entity} and saved to local storage.`);
        };
        reader.readAsText(file);
    };

    const handleExport = () => {
        const entity = exportEntityRef.current?.value || 'Customers';
        const format = exportFormatRef.current?.value || 'CSV';
        const key = `export_${entity}`;
        // For demonstration, we'll create some dummy data if none exists.
        const dummyData = `ID,Name\n1,Sample ${entity} 1\n2,Sample ${entity} 2`;
        const payload = ls.getFromStorage(`import_${entity}`, { fileName: `${entity}.csv`, content: dummyData, date: new Date().toISOString() });
        let blob;
        let fileExtension;

        if (format === 'JSON') {
            blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            fileExtension = 'json';
        } else if (format === 'Excel') {
            // Note: This creates a CSV file but names it .xlsx. True Excel generation requires a library like SheetJS.
            blob = new Blob([payload.content], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fileExtension = 'xlsx';
        } else { // CSV
            blob = new Blob([payload.content], { type: 'text/csv' });
            fileExtension = 'csv';
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
a.href = url;
        a.download = `${entity}_export.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        pushAudit('admin', 'Export', entity, format);
        ls.setToStorage(key, { exportedAt: new Date().toISOString(), format });
    };

    return { importEntityRef, exportEntityRef, exportFormatRef, handleImportFile, handleExport };
};