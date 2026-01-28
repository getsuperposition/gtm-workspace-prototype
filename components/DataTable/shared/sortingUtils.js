/**
 * Sorting utilities for data table
 * Handles alphabetic and numeric sorting with direction control
 */

export const sortData = (data, sortConfig) => {
  if (!sortConfig.key) return data;
  
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    // Numeric comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    // String comparison (case-insensitive)
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();
    
    if (sortConfig.direction === 'asc') {
      return aString.localeCompare(bString);
    } else {
      return bString.localeCompare(aString);
    }
  });
};

export const toggleSortDirection = (currentDirection) => {
  return currentDirection === 'asc' ? 'desc' : 'asc';
};
