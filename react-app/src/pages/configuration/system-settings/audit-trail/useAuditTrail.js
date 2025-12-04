import { useState } from 'react';
import { getAuditTrail } from '../../../../utils/localStorage';

export const useAuditTrail = () => {
  const [items] = useState(getAuditTrail());

  return {
    items,
  };
};
