// Mock data for feed items - 20 total items
export const mockFeedData = [
  {
    id: 'feed-1',
    type: 'meeting',
    timestamp: new Date('2026-01-13T14:30:00'),
    tags: [
      { label: 'Sales Action', variant: 'default' },
      { label: 'Deal Movement', variant: 'default' }
    ],
    title: 'Upcoming meeting brief',
    content: {
      company: {
        name: 'Dell Technologies',
        logo: null
      },
      attendeeCount: 4,
      timeUntil: 'In 30 minutes',
      description: 'Pinecone is considering expanding their seat count by 50 for the data team. This is the 3rd meeting in a row about expanding the engineering team\'s access.',
      attendees: [
        { name: 'Sarah Chen', role: 'VP of Engineering' },
        { name: 'Michael Smith', role: 'Tech Lead' },
        { name: 'David Kim', role: 'Procurement' }
      ],
      // Detail fields for feed detail page
      agenda: [
        'Review Q4 usage metrics and adoption rates',
        'Discuss expansion to data team (50 additional seats)',
        'Address technical integration questions',
        'Review pricing and contract terms'
      ],
      meetingNotes: 'This is the third consecutive meeting focused on expansion. Previous meetings established strong interest from the engineering team and identified the data team as the next logical expansion target.',
      preparationTips: [
        'Review Dell\'s Q4 usage analytics showing 85% adoption rate',
        'Prepare ROI analysis for data team expansion',
        'Have tiered pricing options ready for 50-100 seat expansion',
        'Bring case studies from similar enterprise data team deployments'
      ],
      relatedDocuments: [
        { title: 'Q4 Usage Report - Dell Technologies', url: '#' },
        { title: 'Data Team Expansion Proposal', url: '#' },
        { title: 'Enterprise Pricing Guide', url: '#' }
      ],
      meetingHistory: [
        { date: '2026-01-06', topic: 'Engineering Team Expansion Discussion', outcome: 'Positive - Moving forward' },
        { date: '2025-12-15', topic: 'Q4 Business Review', outcome: 'Successful - High satisfaction' },
        { date: '2025-11-20', topic: 'Technical Integration Review', outcome: 'Resolved all concerns' }
      ]
    },
    sources: 2,
    ctaLabel: 'Prepare for meeting'
  },
  {
    id: 'feed-2',
    type: 'website-visits',
    timestamp: new Date('2026-01-13T10:15:00'),
    tags: [
      { label: 'Web Visit', variant: 'default' },
      { label: 'Intent Change', variant: 'default' }
    ],
    title: 'Website Visits - 4 accounts',
    content: {
      companies: [
        { name: 'Dell Technologies', logo: null },
        { name: 'Maybern', logo: null },
        { name: 'IDEX', logo: null },
        { name: 'Nelnet', logo: null }
      ],
      visitors: [
        {
          name: 'Lisa Rodriguez',
          role: 'IT Director',
          influence: 'MPOC',
          visits: 8,
          topPages: ['/dell-laptops/scr/laptops/appref=inspiron-product-line/pricing']
        },
        {
          name: 'David Park',
          role: 'Procurement Manager',
          influence: 'Vendor comparison lead',
          visits: 4,
          topPages: ['/pricing', '/design-guide-dell-validated-design-for-analytics-data-lake...']
        }
      ],
      // Detail fields for feed detail page
      intentScore: 87,
      pageAnalytics: [
        { page: '/pricing', views: 24, avgTime: '4:32', uniqueVisitors: 3 },
        { page: '/enterprise-features', views: 18, avgTime: '3:45', uniqueVisitors: 2 },
        { page: '/case-studies', views: 12, avgTime: '5:20', uniqueVisitors: 2 },
        { page: '/api-documentation', views: 9, avgTime: '6:15', uniqueVisitors: 1 },
        { page: '/security-compliance', views: 7, avgTime: '3:10', uniqueVisitors: 2 }
      ],
      recommendedActions: [
        'Schedule product demo focusing on enterprise features',
        'Send personalized pricing proposal for 100+ seat deployment',
        'Share relevant case studies from similar IT infrastructure companies',
        'Introduce to customer success team for technical deep-dive'
      ],
      competitorComparison: {
        competitorVisits: ['competitor-a.com', 'competitor-b.com', 'alternative-solution.com'],
        comparisonPages: ['/vs-competitor-a', '/vs-competitor-b'],
        competitorPageViews: 8
      },
      visitorTimeline: [
        { date: '2026-01-13', visits: 8, pages: 12 },
        { date: '2026-01-12', visits: 6, pages: 9 },
        { date: '2026-01-11', visits: 4, pages: 6 },
        { date: '2026-01-10', visits: 3, pages: 4 }
      ]
    },
    sources: 2,
    ctaLabel: 'Analyze visitors'
  },
  {
    id: 'feed-3',
    type: 'upsell',
    timestamp: new Date('2026-01-12T16:45:00'),
    tags: [
      { label: 'Deal Movement', variant: 'default' },
      { label: 'Sales Action', variant: 'default' }
    ],
    title: 'Q4 upsell acceleration',
    content: {
      accounts: [
        { name: 'Stripe', logo: null },
        { name: 'Notion', logo: null },
        { name: 'Snowflake', logo: null }
      ],
      accountCount: 12,
      description: '12 accounts with strong upsell indicators',
      attendees: [
        { name: 'Sarah Chen', role: 'VP of engineering' },
        { name: 'Michael Smith', role: 'Tech lead' },
        { name: 'David Kim', role: 'Procurement' }
      ],
      // Detail fields for feed detail page
      currentTier: 'Professional',
      proposedTier: 'Enterprise',
      revenueImpact: '$470k total expansion potential',
      usageMetrics: {
        activeUsers: 450,
        adoptionRate: '85%',
        featureUtilization: '78%',
        apiCalls: '2.4M/month',
        storageUsed: '850GB'
      },
      expansionDrivers: [
        'Multiple teams hitting usage limits on current tier',
        'Requesting advanced automation features (Enterprise only)',
        'Security team needs enhanced compliance features',
        'Three departments waiting for approval to expand usage',
        'Executive sponsor pushing for company-wide rollout'
      ],
      timeline: {
        phase1: 'Week 1-2: Schedule demos of Enterprise features',
        phase2: 'Week 3: Present ROI analysis and pricing',
        phase3: 'Week 4: Engage with VP Engineering and CFO',
        phase4: 'Week 5-6: Negotiate and close expansion'
      },
      accountBreakdown: [
        { name: 'Stripe', potential: '$180k', confidence: 'High', timeline: '30 days' },
        { name: 'Notion', potential: '$120k', confidence: 'High', timeline: '45 days' },
        { name: 'Snowflake', potential: '$95k', confidence: 'Medium', timeline: '60 days' },
        { name: 'Atlassian', potential: '$75k', confidence: 'Medium', timeline: '60 days' }
      ]
    },
    sources: 2,
    ctaLabel: 'Review play'
  },
  {
    id: 'feed-4',
    type: 'renewal',
    timestamp: new Date('2026-01-12T09:20:00'),
    tags: [
      { label: 'Renewal Milestone', variant: 'default' },
      { label: 'Customer Risk', variant: 'danger' },
      { label: 'Usage Shift', variant: 'warning' }
    ],
    title: 'Q4 renewals',
    content: {
      company: {
        name: 'Atlassian',
        logo: null
      },
      renewalType: 'Renewal',
      value: '$280k',
      risks: [
        { description: '15% decrease in active users over the last 30 days' },
        { description: 'Key champion (VP Engineering) left the company 2 weeks ago' },
        { description: 'Competitor demo scheduled for next week' }
      ],
      createdBy: 'James Roth',
      // Detail fields for feed detail page
      contractDetails: {
        startDate: '2025-03-15',
        endDate: '2026-03-15',
        renewalDate: '2026-03-15',
        daysUntilRenewal: 51,
        terms: 'Annual contract with quarterly business reviews',
        autoRenew: false
      },
      healthScore: 62,
      usageTrends: [
        { month: 'Oct 2025', activeUsers: 420, score: 85 },
        { month: 'Nov 2025', activeUsers: 405, score: 78 },
        { month: 'Dec 2025', activeUsers: 380, score: 70 },
        { month: 'Jan 2026', activeUsers: 357, score: 62 }
      ],
      stakeholderMap: [
        { name: 'Jennifer Martinez', role: 'New VP Engineering', relationship: 'Unknown', influence: 'High' },
        { name: 'Robert Chen', role: 'Tech Lead', relationship: 'Positive', influence: 'Medium' },
        { name: 'Lisa Park', role: 'Product Manager', relationship: 'Neutral', influence: 'Medium' },
        { name: 'David Kim', role: 'Procurement', relationship: 'Positive', influence: 'High' }
      ],
      competitorThreats: [
        { competitor: 'Competitor A', activity: 'Demo scheduled', date: '2026-01-20' },
        { competitor: 'Competitor B', activity: 'Pricing proposal sent', date: '2026-01-15' }
      ],
      successMetrics: {
        roi: '142%',
        timeSaved: '1,200 hours/quarter',
        errorReduction: '60%',
        satisfactionScore: '7.2/10'
      }
    },
    sources: 2,
    ctaLabel: 'Schedule executive review'
  },
  {
    id: 'feed-5',
    type: 'contact-departure',
    timestamp: new Date('2026-01-11T14:30:00'),
    tags: [
      { label: 'Contact Change', variant: 'default' },
      { label: 'Customer Risk', variant: 'warning' }
    ],
    title: 'Key contact departures',
    content: {
      companies: [
        { name: 'Atlassian', logo: null },
        { name: 'Amplitude', logo: null },
        { name: 'Netflix', logo: null },
        { name: 'Orange Bank', logo: null }
      ],
      accountCount: 8,
      // Detail fields for feed detail page
      departedContacts: [
        {
          name: 'Jennifer Wu',
          role: 'VP Engineering',
          company: 'Atlassian',
          departureDate: '2026-01-05',
          relationshipStrength: 'Champion',
          accountValue: '$280k'
        },
        {
          name: 'Marcus Johnson',
          role: 'Tech Lead',
          company: 'Amplitude',
          departureDate: '2026-01-08',
          relationshipStrength: 'Strong User',
          accountValue: '$120k'
        },
        {
          name: 'Sarah Mitchell',
          role: 'Product Director',
          company: 'Netflix',
          departureDate: '2026-01-10',
          relationshipStrength: 'Champion',
          accountValue: '$450k'
        }
      ],
      replacementContacts: [
        {
          name: 'Jennifer Martinez',
          role: 'VP Engineering',
          company: 'Atlassian',
          status: 'Identified',
          outreachStatus: 'Pending'
        },
        {
          name: 'Robert Chang',
          role: 'Engineering Manager',
          company: 'Amplitude',
          status: 'Identified',
          outreachStatus: 'Initial contact made'
        },
        {
          name: 'Unknown',
          role: 'Product Director',
          company: 'Netflix',
          status: 'Not yet identified',
          outreachStatus: 'Researching'
        }
      ],
      relationshipStrength: 85,
      riskMitigation: [
        'Schedule introduction meetings with all replacement contacts within 2 weeks',
        'Provide comprehensive value recap and success metrics to new stakeholders',
        'Offer product training sessions for new team members',
        'Arrange executive sponsor engagement for high-value accounts',
        'Document all tribal knowledge and share with new contacts'
      ],
      accountImpact: {
        totalAtRisk: '$850k',
        highRiskAccounts: 3,
        mediumRiskAccounts: 5,
        immediateActionRequired: 3
      }
    },
    sources: 2,
    ctaLabel: 'Analyze risk factors'
  },
  {
    id: 'feed-6',
    type: 'meeting',
    timestamp: new Date('2026-01-11T11:00:00'),
    tags: [
      { label: 'Renewal Milestone', variant: 'default' },
      { label: 'Sales Action', variant: 'default' }
    ],
    title: 'Executive renewal discussion',
    content: {
      company: {
        name: 'Snowflake',
        logo: null
      },
      attendeeCount: 3,
      timeUntil: 'Tomorrow at 2pm',
      description: 'Annual renewal discussion with executive team. Contract value $450k with potential for 25% expansion based on recent usage patterns.',
      attendees: [
        { name: 'Jennifer Wu', role: 'CTO' },
        { name: 'Marcus Johnson', role: 'VP Finance' },
        { name: 'Alex Rivera', role: 'Procurement Lead' }
      ]
    },
    sources: 3,
    ctaLabel: 'Prepare for meeting'
  },
  {
    id: 'feed-7',
    type: 'upsell',
    timestamp: new Date('2026-01-10T15:20:00'),
    tags: [
      { label: 'Deal Movement', variant: 'default' },
      { label: 'Growth Event', variant: 'warning' }
    ],
    title: 'Enterprise expansion opportunity',
    content: {
      accounts: [
        { name: 'Netflix', logo: null },
        { name: 'Amplitude', logo: null }
      ],
      accountCount: 2,
      description: '2 enterprise accounts showing strong expansion signals',
      attendees: [
        { name: 'Rachel Green', role: 'Enterprise AE' },
        { name: 'Tom Brady', role: 'Solutions Architect' }
      ]
    },
    sources: 2,
    ctaLabel: 'Review opportunity'
  },
  {
    id: 'feed-8',
    type: 'website-visits',
    timestamp: new Date('2026-01-10T08:45:00'),
    tags: [
      { label: 'Web Visit', variant: 'default' },
      { label: 'Intent Change', variant: 'warning' }
    ],
    title: 'Website Visits - 2 accounts',
    content: {
      companies: [
        { name: 'Stripe', logo: null },
        { name: 'Notion', logo: null }
      ],
      visitors: [
        {
          name: 'Emma Thompson',
          role: 'Engineering Manager',
          influence: 'Technical Champion',
          visits: 12,
          topPages: ['/pricing', '/enterprise-features', '/api-documentation']
        }
      ]
    },
    sources: 1,
    ctaLabel: 'Analyze visitors'
  },
  {
    id: 'feed-9',
    type: 'renewal',
    timestamp: new Date('2026-01-09T13:15:00'),
    tags: [
      { label: 'Renewal Milestone', variant: 'default' },
      { label: 'Data Update', variant: 'default' }
    ],
    title: 'Q4 renewal - On track',
    content: {
      company: {
        name: 'Notion',
        logo: null
      },
      renewalType: 'Annual Renewal',
      value: '$125k',
      risks: [],
      createdBy: 'Sarah Mitchell'
    },
    sources: 2,
    ctaLabel: 'Review renewal'
  },
  {
    id: 'feed-10',
    type: 'contact-departure',
    timestamp: new Date('2026-01-08T10:30:00'),
    tags: [
      { label: 'Contact Change', variant: 'default' },
      { label: 'Org Change', variant: 'default' }
    ],
    title: 'Contact role changes',
    content: {
      companies: [
        { name: 'Dell Technologies', logo: null },
        { name: 'IDEX', logo: null }
      ],
      accountCount: 2
    },
    sources: 1,
    ctaLabel: 'Review changes'
  },
  {
    id: 'feed-11',
    type: 'meeting',
    timestamp: new Date('2026-01-08T09:00:00'),
    tags: [
      { label: 'Sales Action', variant: 'default' },
      { label: 'Deal Movement', variant: 'default' }
    ],
    title: 'Product demo - AI features',
    content: {
      company: {
        name: 'Salesforce',
        logo: null
      },
      attendeeCount: 6,
      timeUntil: 'In 2 hours',
      description: 'Demonstrating new AI-powered analytics features to the Salesforce data science team. High interest in predictive modeling capabilities.',
      attendees: [
        { name: 'Dr. Amanda Lee', role: 'Chief Data Scientist' },
        { name: 'Robert Chang', role: 'ML Engineer' },
        { name: 'Patricia Moore', role: 'Product Manager' },
        { name: 'Kevin Zhang', role: 'Engineering Director' }
      ]
    },
    sources: 2,
    ctaLabel: 'Prepare for meeting'
  },
  {
    id: 'feed-12',
    type: 'website-visits',
    timestamp: new Date('2026-01-07T16:20:00'),
    tags: [
      { label: 'Web Visit', variant: 'default' },
      { label: 'Competitor Insight', variant: 'warning' }
    ],
    title: 'Website Visits - 3 accounts',
    content: {
      companies: [
        { name: 'Adobe', logo: null },
        { name: 'Figma', logo: null },
        { name: 'Canva', logo: null }
      ],
      visitors: [
        {
          name: 'Jessica Martinez',
          role: 'Design Director',
          influence: 'Decision Maker',
          visits: 15,
          topPages: ['/comparison', '/pricing/enterprise', '/case-studies']
        },
        {
          name: 'Chris Anderson',
          role: 'Creative Lead',
          influence: 'Influencer',
          visits: 7,
          topPages: ['/features', '/integrations', '/api']
        }
      ]
    },
    sources: 3,
    ctaLabel: 'Analyze visitors'
  },
  {
    id: 'feed-13',
    type: 'upsell',
    timestamp: new Date('2026-01-07T11:30:00'),
    tags: [
      { label: 'Deal Movement', variant: 'default' },
      { label: 'Usage Shift', variant: 'default' }
    ],
    title: 'Premium tier upgrade opportunity',
    content: {
      accounts: [
        { name: 'Shopify', logo: null },
        { name: 'Square', logo: null },
        { name: 'PayPal', logo: null },
        { name: 'Adyen', logo: null }
      ],
      accountCount: 4,
      description: '4 accounts hitting usage limits on current tier',
      attendees: [
        { name: 'Michelle Rodriguez', role: 'Account Executive' },
        { name: 'Brian Foster', role: 'Customer Success' }
      ]
    },
    sources: 2,
    ctaLabel: 'Review opportunity'
  },
  {
    id: 'feed-14',
    type: 'renewal',
    timestamp: new Date('2026-01-06T14:45:00'),
    tags: [
      { label: 'Renewal Milestone', variant: 'default' },
      { label: 'Growth Event', variant: 'default' }
    ],
    title: 'Renewal with expansion potential',
    content: {
      company: {
        name: 'Zoom',
        logo: null
      },
      renewalType: 'Annual Renewal + Expansion',
      value: '$380k',
      risks: [],
      createdBy: 'Daniel Kim'
    },
    sources: 3,
    ctaLabel: 'Review renewal'
  },
  {
    id: 'feed-15',
    type: 'contact-departure',
    timestamp: new Date('2026-01-06T10:15:00'),
    tags: [
      { label: 'Contact Change', variant: 'default' },
      { label: 'Customer Risk', variant: 'danger' }
    ],
    title: 'Champion departures - Urgent',
    content: {
      companies: [
        { name: 'Salesforce', logo: null },
        { name: 'HubSpot', logo: null },
        { name: 'Zendesk', logo: null }
      ],
      accountCount: 3
    },
    sources: 2,
    ctaLabel: 'Analyze risk factors'
  },
  {
    id: 'feed-16',
    type: 'meeting',
    timestamp: new Date('2026-01-05T15:30:00'),
    tags: [
      { label: 'Sales Action', variant: 'default' },
      { label: 'Renewal Milestone', variant: 'default' }
    ],
    title: 'Quarterly business review',
    content: {
      company: {
        name: 'Microsoft',
        logo: null
      },
      attendeeCount: 8,
      timeUntil: 'Next Monday at 10am',
      description: 'Q4 business review with Microsoft Azure team. Discussing ROI, usage trends, and 2026 strategic initiatives. Potential for 40% expansion.',
      attendees: [
        { name: 'Linda Chen', role: 'VP Cloud Services' },
        { name: 'Mark Stevens', role: 'Director of Engineering' },
        { name: 'Priya Patel', role: 'Finance Manager' }
      ]
    },
    sources: 2,
    ctaLabel: 'Prepare for meeting'
  },
  {
    id: 'feed-17',
    type: 'website-visits',
    timestamp: new Date('2026-01-05T09:00:00'),
    tags: [
      { label: 'Web Visit', variant: 'default' },
      { label: 'Intent Change', variant: 'default' }
    ],
    title: 'Website Visits - 5 accounts',
    content: {
      companies: [
        { name: 'Uber', logo: null },
        { name: 'Lyft', logo: null },
        { name: 'DoorDash', logo: null },
        { name: 'Instacart', logo: null },
        { name: 'Postmates', logo: null }
      ],
      visitors: [
        {
          name: 'Carlos Mendez',
          role: 'Operations Director',
          influence: 'Budget Holder',
          visits: 9,
          topPages: ['/solutions/logistics', '/pricing/volume', '/integrations/maps']
        }
      ]
    },
    sources: 2,
    ctaLabel: 'Analyze visitors'
  },
  {
    id: 'feed-18',
    type: 'upsell',
    timestamp: new Date('2026-01-04T13:20:00'),
    tags: [
      { label: 'Deal Movement', variant: 'default' },
      { label: 'Funding Event', variant: 'default' }
    ],
    title: 'Security add-on opportunity',
    content: {
      accounts: [
        { name: 'Goldman Sachs', logo: null },
        { name: 'JP Morgan', logo: null },
        { name: 'Morgan Stanley', logo: null }
      ],
      accountCount: 3,
      description: '3 financial services accounts requiring enhanced security features',
      attendees: [
        { name: 'Victoria Banks', role: 'Enterprise AE' },
        { name: 'Samuel Lee', role: 'Security Specialist' }
      ]
    },
    sources: 3,
    ctaLabel: 'Review opportunity'
  },
  {
    id: 'feed-19',
    type: 'renewal',
    timestamp: new Date('2026-01-04T08:30:00'),
    tags: [
      { label: 'Renewal Milestone', variant: 'default' },
      { label: 'Customer Risk', variant: 'warning' }
    ],
    title: 'Renewal with pricing adjustment',
    content: {
      company: {
        name: 'Spotify',
        logo: null
      },
      renewalType: 'Renewal',
      value: '$195k',
      risks: [
        { description: 'Price increase of 12% may cause pushback' }
      ],
      createdBy: 'Angela Martinez'
    },
    sources: 2,
    ctaLabel: 'Schedule executive review'
  },
  {
    id: 'feed-20',
    type: 'contact-departure',
    timestamp: new Date('2026-01-03T16:00:00'),
    tags: [
      { label: 'Ownership Change', variant: 'default' },
      { label: 'Contact Change', variant: 'default' }
    ],
    title: 'New stakeholder introductions',
    content: {
      companies: [
        { name: 'Tesla', logo: null },
        { name: 'SpaceX', logo: null }
      ],
      accountCount: 2
    },
    sources: 1,
    ctaLabel: 'Review changes'
  }
];

// Helper function to get random items from the feed
export const getRandomFeedItems = (count = 10) => {
  const shuffled = [...mockFeedData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to sort feed items by timestamp (newest first)
export const sortFeedByTimestamp = (feedItems) => {
  return [...feedItems].sort((a, b) => b.timestamp - a.timestamp);
};
