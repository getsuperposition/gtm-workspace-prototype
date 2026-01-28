/**
 * Column utilities for data table
 * Handles column visibility management
 */

export const getVisibleColumns = (columns) => {
  return columns.filter(col => col.visible !== false);
};

export const toggleColumnVisibility = (columns, columnId) => {
  return columns.map(col => 
    col.id === columnId 
      ? { ...col, visible: !col.visible }
      : col
  );
};

export const ensureMinimumVisibleColumns = (columns, minCount = 1) => {
  const visibleCount = columns.filter(col => col.visible).length;
  return visibleCount >= minCount;
};
