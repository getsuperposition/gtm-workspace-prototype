/**
 * Selection utilities for data table
 * Handles row selection logic
 */

export const toggleRowSelection = (selectedRows, rowId) => {
  if (selectedRows.includes(rowId)) {
    return selectedRows.filter(id => id !== rowId);
  } else {
    return [...selectedRows, rowId];
  }
};

export const toggleSelectAll = (selectedRows, allRowIds) => {
  if (selectedRows.length === allRowIds.length) {
    return []; // Deselect all
  } else {
    return [...allRowIds]; // Select all
  }
};

export const getSelectionState = (selectedRows, allRowIds) => {
  if (selectedRows.length === 0) return 'none';
  if (selectedRows.length === allRowIds.length) return 'all';
  return 'some';
};
