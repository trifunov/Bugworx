import { programTypes, programStatuses } from '../data/mockData';

export const getProgramTypeLabel = (id) => {
    const found = programTypes.find(pt => pt.id === id);
    return found ? found.label : '';
};

export const getProgramStatusLabel = (id) => {
    const found = programStatuses.find(ps => ps.id === id);
    return found ? found.label : '';
};

export const getProgramTypeId = (label) => {
    if (!label) return null;
    const found = programTypes.find(pt => pt.label.toLowerCase() === label.toLowerCase());
    return found ? found.id : null;
};

export const getProgramStatusId = (label) => {
    if (!label) return null;
    const found = programStatuses.find(ps => ps.label.toLowerCase() === label.toLowerCase());
    return found ? found.id : null;
};

// Utility to enrich a program object with display labels (non-mutating)
export const enrichProgram = (program) => {
    if (!program) return null;
    return {
        ...program,
        programTypeLabel: getProgramTypeLabel(program.programTypeId),
        statusLabel: getProgramStatusLabel(program.statusId)
    };
};
