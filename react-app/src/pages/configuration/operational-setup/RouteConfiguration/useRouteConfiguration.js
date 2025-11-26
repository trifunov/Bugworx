import { useState, useEffect } from 'react';
import { getRouteConfiguration, saveRouteConfiguration, getOperationalZones } from '../../../../utils/localStorage';

export const useRouteConfiguration = () => {
  const [items, setItems] = useState(getRouteConfiguration());
  const [zones, setZones] = useState(getOperationalZones());
  useEffect(() => {
    saveRouteConfiguration(items);
  }, [items]);

  const saveItem = (formData) => {
    // Convert stops string back to an array
    const stops = formData.stops ? formData.stops.split(',').map(s => s.trim()).filter(s => s) : [];
    const itemData = { ...formData, stops };

    if (itemData.id) {
      setItems(prev => prev.map(it => (it.id === itemData.id ? itemData : it)));
    } else {
      const newItem = { ...itemData, id: Date.now().toString() };
      setItems(prev => [newItem, ...prev]);
    }
  };

  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this route?')) return;
    setItems(prev => prev.filter(it => it.id !== id));
  };

  return {
    items,
    zones,
    saveItem,
    removeItem,
  };
};