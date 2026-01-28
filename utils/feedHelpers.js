import { mockFeedData } from '../data/mockFeedData';

// Helper function to generate summary text for feed item summary cards
export const generateSummaryText = (type, content) => {
  switch (type) {
    case 'meeting':
      return `${content.company.name} • ${content.attendeeCount} attendees • ${content.timeUntil}`;
    
    case 'website-visits':
      const companies = content.companies.slice(0, 2).map(c => c.name).join(', ');
      const more = content.companies.length > 2 ? ` +${content.companies.length - 2} more` : '';
      return `${companies}${more} showing increased engagement`;
    
    case 'upsell':
      return `${content.accountCount} accounts with strong expansion signals`;
    
    case 'renewal':
      const riskText = content.risks.length > 0
        ? `${content.risks.length} risk factor${content.risks.length > 1 ? 's' : ''} identified`
        : 'On track for renewal';
      return `${content.company.name} • ${content.value} • ${riskText}`;
    
    case 'contact-departure':
      return `${content.accountCount} account${content.accountCount > 1 ? 's' : ''} with key contact changes`;
    
    default:
      return 'View details for more information';
  }
};

// Helper function to generate preview text for feed items
export const generatePreviewText = (type, content) => {
  switch (type) {
    case 'meeting':
      return `${content.company.name} • ${content.attendeeCount} attendees • ${content.timeUntil}`;
    
    case 'website-visits':
      const companyNames = content.companies.slice(0, 2).map(c => c.name).join(', ');
      const moreCompanies = content.companies.length > 2 ? ` +${content.companies.length - 2} more` : '';
      return `${companyNames}${moreCompanies} • ${content.visitors.length} visitor${content.visitors.length > 1 ? 's' : ''}`;
    
    case 'upsell':
      const accountNames = content.accounts.slice(0, 2).map(a => a.name).join(', ');
      const moreAccounts = content.accountCount > 2 ? ` +${content.accountCount - 2} more` : '';
      return `${accountNames}${moreAccounts} • ${content.description}`;
    
    case 'renewal':
      const riskStatus = content.risks.length > 0 ? `${content.risks.length} risk${content.risks.length > 1 ? 's' : ''}` : 'On track';
      return `${content.company.name} • ${content.value} • ${riskStatus}`;
    
    case 'contact-departure':
      const departureCompanies = content.companies.slice(0, 2).map(c => c.name).join(', ');
      const moreDepartures = content.accountCount > 2 ? ` +${content.accountCount - 2} more` : '';
      return `${departureCompanies}${moreDepartures} • ${content.accountCount} account${content.accountCount > 1 ? 's' : ''}`;
    
    default:
      return 'View details';
  }
};

// Get feed item by ID
export const getFeedItemById = (id) => {
  return mockFeedData.find(item => item.id === id);
};

// Get recent feed items sorted by timestamp
export const getRecentFeedItems = (count = 9) => {
  const sorted = [...mockFeedData].sort((a, b) => b.timestamp - a.timestamp);
  return sorted.slice(0, count);
};

// Format timestamp for display (relative time)
export const formatFeedTimestamp = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
};
