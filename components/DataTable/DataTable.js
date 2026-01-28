'use client';

import DataTableV1 from './variants/v1-modern/DataTableV1';
import DataTableV4 from './variants/v4-inline/DataTableV4';
// import DataTableV2 from './variants/v2-minimal/DataTableV2';
// import DataTableV3 from './variants/v3-dense/DataTableV3';

const variantComponents = {
  'v1-modern': DataTableV1,
  'v4-inline': DataTableV4,
  // 'v2-minimal': DataTableV2,
  // 'v3-dense': DataTableV3,
};

/**
 * Main DataTable wrapper component with variant routing
 * Routes to the appropriate variant based on the variant prop
 * 
 * @param {string} variant - The variant to render (default: 'v1-modern')
 * @param {Array} data - The table data rows
 * @param {Array} columns - The column definitions
 * @param {Object} props - Additional props to pass to the variant
 */
export default function DataTable({ variant = 'v1-modern', data, columns, ...props }) {
  const VariantComponent = variantComponents[variant];
  
  if (!VariantComponent) {
    console.error(`Unknown table variant: ${variant}`);
    return null;
  }
  
  return <VariantComponent data={data} columns={columns} {...props} />;
}
