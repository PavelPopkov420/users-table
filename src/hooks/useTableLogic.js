import { useState, useMemo, useCallback } from 'react';

const DEFAULT_COLUMN_WIDTHS = {
  lastName: 120,
  firstName: 120,
  age: 80,
  gender: 80,
  phone: 150,
  email: 200,
  country: 120,
  city: 120
};

const INITIAL_FILTERS = Object.keys(DEFAULT_COLUMN_WIDTHS).reduce((acc, key) => {
  acc[key] = '';
  return acc;
}, {});

export const useTableLogic = (initialUsers) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [columnWidths, setColumnWidths] = useState(DEFAULT_COLUMN_WIDTHS);


  const sortedUsers = useMemo(() => {
    if (sortConfig.direction === 'none') return initialUsers;
    
    const { key, direction } = sortConfig;
    return [...initialUsers].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      
      if (aValue === bValue) return 0;
      return (aValue < bValue ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    });
  }, [initialUsers, sortConfig]);


  const filteredUsers = useMemo(() => {
    const filterKeys = Object.keys(filters);
    return sortedUsers.filter(user => {
      return filterKeys.every(key => {
        const filterValue = filters[key].toLowerCase();
        
        if (key === 'age') {
          return filterValue === '' || user.age.toString().includes(filterValue);
        }
        
        const userValue = key.includes('.') 
          ? key.split('.').reduce((obj, k) => obj?.[k], user)?.toString().toLowerCase() || ''
          : String(user[key]).toLowerCase();
        
        return userValue.includes(filterValue);
      });
    });
  }, [sortedUsers, filters]);

  const handleSort = useCallback((key) => {
    setSortConfig(prev => {
      if (prev.key !== key) return { key, direction: 'asc' };
      
      const directionMap = {
        'asc': 'desc',
        'desc': 'none',
        'none': 'asc'
      };
      
      return { key, direction: directionMap[prev.direction] };
    });
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);


  const memoizedSetColumnWidths = useCallback((updater) => {
    setColumnWidths(typeof updater === 'function' ? updater : (prev) => ({ ...prev, ...updater }));
  }, []);

  return useMemo(() => ({
    filteredUsers,
    sortConfig,
    filters,
    columnWidths,
    handleSort,
    handleFilterChange,
    setColumnWidths: memoizedSetColumnWidths
  }), [
    filteredUsers,
    sortConfig,
    filters,
    columnWidths,
    handleSort,
    handleFilterChange,
    memoizedSetColumnWidths
  ]);
};