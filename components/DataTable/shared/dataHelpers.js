/**
 * Data helper utilities for data table
 * Handles data transformation and formatting
 */

export const getRowId = (row, index) => {
  return row.id || `row-${index}`;
};

export const getAllRowIds = (data) => {
  return data.map((row, index) => getRowId(row, index));
};
