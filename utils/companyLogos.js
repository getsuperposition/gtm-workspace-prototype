// Company logo mapping utility
// Uses Unavatar API for reliable logo delivery (aggregates multiple sources)

// Map of company names to their domain
const companyDomains = {
  'adobe': 'adobe.com',
  'adyen': 'adyen.com',
  'airbnb': 'airbnb.com',
  'amplitude': 'amplitude.com',
  'atlassian': 'atlassian.com',
  'bright horizons': 'brighthorizons.com',
  'canva': 'canva.com',
  'datadog': 'datadoghq.com',
  'datarobot': 'datarobot.com',
  'dell': 'dell.com',
  'dell technologies': 'dell.com',
  'doordash': 'doordash.com',
  'dropbox': 'dropbox.com',
  'figma': 'figma.com',
  'goldman sachs': 'goldmansachs.com',
  'gooddata': 'gooddata.com',
  'hubspot': 'hubspot.com',
  'ibm': 'ibm.com',
  'idex': 'idexcorp.com',
  'instacart': 'instacart.com',
  'jp morgan': 'jpmorganchase.com',
  'jpmorgan': 'jpmorganchase.com',
  'lyft': 'lyft.com',
  'microsoft': 'microsoft.com',
  'morgan stanley': 'morganstanley.com',
  'nelnet': 'nelnet.com',
  'netflix': 'netflix.com',
  'notion': 'notion.so',
  'paypal': 'paypal.com',
  'pinterest': 'pinterest.com',
  'postmates': 'postmates.com',
  'salesforce': 'salesforce.com',
  'shopify': 'shopify.com',
  'smartsheet': 'smartsheet.com',
  'snowflake': 'snowflake.com',
  'spacex': 'spacex.com',
  'spotify': 'spotify.com',
  'square': 'squareup.com',
  'stripe': 'stripe.com',
  'tesla': 'tesla.com',
  'uber': 'uber.com',
  'zendesk': 'zendesk.com',
  'zoom': 'zoom.us',
  // Additional companies from mock data
  'orange bank': 'orange.com',
  'sangorama': null, // No known domain
  'maybern': null, // No known domain
  'fintechco': null, // Fictional company
};

/**
 * Get logo URL for a company name using Unavatar
 * @param {string} companyName - The name of the company
 * @returns {string|null} - The Unavatar logo URL or null if not found
 */
export const getCompanyLogo = (companyName) => {
  if (!companyName) return null;

  const normalizedName = companyName.toLowerCase().trim();

  // Check exact match first
  if (companyDomains[normalizedName] !== undefined) {
    const domain = companyDomains[normalizedName];
    return domain ? `https://unavatar.io/${domain}?fallback=false` : null;
  }

  // Check for partial matches
  for (const [key, domain] of Object.entries(companyDomains)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return domain ? `https://unavatar.io/${domain}?fallback=false` : null;
    }
  }

  // No match found - return null to show placeholder
  return null;
};

/**
 * Add company logo to a company object
 * @param {Object} company - Company object with name property
 * @returns {Object} - Company object with logo property added
 */
export const addLogoToCompany = (company) => {
  if (!company || !company.name) return company;

  return {
    ...company,
    logo: getCompanyLogo(company.name)
  };
};

/**
 * Add logos to an array of companies
 * @param {Array} companies - Array of company objects
 * @returns {Array} - Array of company objects with logos added
 */
export const addLogosToCompanies = (companies) => {
  if (!Array.isArray(companies)) return companies;
  return companies.map(addLogoToCompany);
};

export default companyDomains;
