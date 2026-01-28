// Extended mock data for the redesigned Pulse Feed
// Includes new pulse types: assigned-view, key-promotions, new-hire

export const mockPulseData = [
  {
    id: 'pulse-1',
    type: 'assigned-view',
    timestamp: new Date('2026-01-26T09:30:00'),
    title: 'Assigned a new View',
    content: {
      view: {
        id: 'view-123',
        name: 'Outbound Acceleration - Competitor',
        owner: 'James Roth',
        accountCount: 45,
        contactCount: 94,
      },
      description: 'Accounts with no engagement in over 60 days, competitive intent for Clay and Apollo. Shows only C-level contacts to engage.',
    },
  },
  {
    id: 'pulse-2',
    type: 'meeting-prep',
    timestamp: new Date('2026-01-26T09:00:00'),
    title: 'Prepare for upcoming meeting',
    content: {
      company: {
        name: 'Dell Technologies',
        logo: null,
      },
      value: '$180K',
      stage: 'Renewal',
      recency: 'Emailed 3 days ago',
      meeting: {
        id: 'meeting-456',
        name: 'Dell Data team expansion',
        time: 'Tomorrow 10am PST',
        attendeeCount: 5,
      },
      description: 'Dell is considering expanding their seat count by 50 for the data team. This is the 3rd meeting in a row about expanding the engineering team\'s access.',
    },
  },
  {
    id: 'pulse-3',
    type: 'website-visits',
    timestamp: new Date('2026-01-26T07:00:00'),
    title: '8 website visits',
    content: {
      company: {
        name: 'Dell Technologies',
        logo: null,
      },
      value: '$180K',
      stage: 'Renewal',
      recency: 'Emailed 3 days ago',
      intentSignal: 'Dell shows high purchase likelihood with 340% increased research activity from multiple IT and Procurement stakeholders. Peak activity in last 72 hours suggests accelerated timeline.',
      visitors: [
        {
          id: 'v1',
          name: 'Lisa Rodriguez',
          role: 'IT Director',
          visits: 8,
          topPages: ['/dell-laptops/scr/laptops/appref=inspiron-product-line/pricing'],
        },
        {
          id: 'v2',
          name: 'David Park',
          role: 'Procurement Manager',
          visits: 4,
          topPages: ['/dell-laptops/scr/laptops/appref=inspiron-product-line/pricing'],
        },
        {
          id: 'v3',
          name: 'Samuel Ferguson',
          role: 'Director of Business Dev...',
          visits: 3,
          topPages: ['/dell-laptops/scr/laptops/appref=inspiron-product-line/pricing'],
        },
        {
          id: 'v4',
          name: 'Tami Hansford',
          role: 'Financial Services',
          visits: 1,
          topPages: ['/dell-laptops/scr/laptops/appref=inspiron-product-line/pricing'],
        },
        {
          id: 'v5',
          name: 'Michael Chen',
          role: 'VP Engineering',
          visits: 6,
          topPages: ['/enterprise-solutions/integration'],
        },
        {
          id: 'v6',
          name: 'Jennifer Wu',
          role: 'Security Lead',
          visits: 2,
          topPages: ['/security/compliance'],
        },
        {
          id: 'v7',
          name: 'Robert Kim',
          role: 'Data Architect',
          visits: 4,
          topPages: ['/data-platform/analytics'],
        },
        {
          id: 'v8',
          name: 'Amanda Torres',
          role: 'Product Manager',
          visits: 3,
          topPages: ['/features/roadmap'],
        },
        {
          id: 'v9',
          name: 'Chris Johnson',
          role: 'DevOps Lead',
          visits: 5,
          topPages: ['/integrations/ci-cd'],
        },
        {
          id: 'v10',
          name: 'Patricia Lee',
          role: 'CTO Office',
          visits: 2,
          topPages: ['/enterprise/pricing'],
        },
        {
          id: 'v11',
          name: 'Daniel Brown',
          role: 'Infrastructure Lead',
          visits: 3,
          topPages: ['/deployment/cloud'],
        },
        {
          id: 'v12',
          name: 'Sarah Miller',
          role: 'Tech Lead',
          visits: 4,
          topPages: ['/api/documentation'],
        },
        {
          id: 'v13',
          name: 'Kevin Davis',
          role: 'Solutions Architect',
          visits: 2,
          topPages: ['/architecture/best-practices'],
        },
      ],
    },
  },
  {
    id: 'pulse-4',
    type: 'key-promotions',
    timestamp: new Date('2026-01-26T05:00:00'),
    title: 'Key promotions',
    content: {
      accountCount: 31,
      contactCount: 72,
      promotions: [
        {
          id: 'p1',
          accountName: 'Atlassian',
          accountLogo: null,
          contactName: 'Oscar Rodriguez',
          newRole: 'Marketing Technologist',
        },
        {
          id: 'p2',
          accountName: 'Amplitude',
          accountLogo: null,
          contactName: 'Jordan Carter',
          newRole: 'Associate Vice President',
        },
        {
          id: 'p3',
          accountName: 'Sangorama',
          accountLogo: null,
          contactName: 'Miranda Wallace',
          newRole: 'Senior Vice President, Sales',
        },
        {
          id: 'p4',
          accountName: 'Orange Bank',
          accountLogo: null,
          contactName: 'Angela Canas',
          newRole: 'Senior VP, Finance',
        },
        // More promotions for pagination demo
        {
          id: 'p5',
          accountName: 'Stripe',
          accountLogo: null,
          contactName: 'Marcus Chen',
          newRole: 'VP of Engineering',
        },
        {
          id: 'p6',
          accountName: 'Notion',
          accountLogo: null,
          contactName: 'Emily Zhang',
          newRole: 'Head of Product',
        },
        {
          id: 'p7',
          accountName: 'Snowflake',
          accountLogo: null,
          contactName: 'David Kim',
          newRole: 'Chief Data Officer',
        },
        {
          id: 'p8',
          accountName: 'Salesforce',
          accountLogo: null,
          contactName: 'Sarah Johnson',
          newRole: 'SVP Customer Success',
        },
      ],
    },
  },
  {
    id: 'pulse-5',
    type: 'new-hire',
    timestamp: new Date('2026-01-26T03:00:00'),
    title: 'New C-level hire',
    content: {
      company: {
        name: 'Orange Bank',
        logo: null,
      },
      value: '$90K',
      stage: 'Discovery',
      recency: 'Meeting yesterday',
      hire: {
        name: 'Samuel Johnson',
        role: 'CTO',
        background: 'He has a background in cloud infrastructure and led platform engineering at FinTechCo. His priorities include modernizing the tech stack, improving developer velocity, and scaling the data platform. Reach out to discuss how your solutions can support these initiatives.',
      },
      narrative: 'Samuel Johnson joined Orange Bank as a new CTO. Now is a good time to introduce yourself.',
    },
  },
  // Additional pulses for variety
  {
    id: 'pulse-6',
    type: 'meeting-prep',
    timestamp: new Date('2026-01-25T14:00:00'),
    title: 'Prepare for upcoming meeting',
    content: {
      company: {
        name: 'Snowflake',
        logo: null,
      },
      value: '$450K',
      stage: 'Negotiation',
      recency: 'Last week',
      meeting: {
        id: 'meeting-789',
        name: 'Q1 Contract Review',
        time: 'Friday 2pm EST',
        attendeeCount: 4,
      },
      description: 'Annual renewal discussion with executive team. Contract value $450k with potential for 25% expansion based on recent usage patterns.',
    },
  },
  {
    id: 'pulse-7',
    type: 'website-visits',
    timestamp: new Date('2026-01-25T10:00:00'),
    title: '12 website visits',
    content: {
      company: {
        name: 'Stripe',
        logo: null,
      },
      value: '$280K',
      stage: 'Expansion',
      recency: 'Active account',
      intentSignal: 'Stripe engineering team showing strong interest in advanced API features and enterprise security capabilities.',
      visitors: [
        {
          id: 'sv1',
          name: 'Emma Thompson',
          role: 'Engineering Manager',
          visits: 12,
          topPages: ['/api/advanced-features'],
        },
        {
          id: 'sv2',
          name: 'James Wilson',
          role: 'Security Architect',
          visits: 8,
          topPages: ['/enterprise/security'],
        },
        {
          id: 'sv3',
          name: 'Rachel Green',
          role: 'Product Lead',
          visits: 5,
          topPages: ['/pricing/enterprise'],
        },
      ],
    },
  },
  {
    id: 'pulse-8',
    type: 'new-hire',
    timestamp: new Date('2026-01-24T16:00:00'),
    title: 'New VP of Sales',
    content: {
      company: {
        name: 'Notion',
        logo: null,
      },
      value: '$125K',
      stage: 'Renewal',
      recency: 'Renewal in 45 days',
      hire: {
        name: 'Alexandra Chen',
        role: 'VP of Sales',
        background: 'Previously led enterprise sales at Figma, with expertise in scaling B2B SaaS sales teams. Focus on expanding enterprise footprint and improving sales velocity.',
      },
      narrative: 'Alexandra Chen joined Notion as VP of Sales. With the renewal coming up in 45 days, this is a strategic time to build a relationship.',
    },
  },
];

// Helper to get random pulse items
export const getRandomPulseItems = (count = 8) => {
  const shuffled = [...mockPulseData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper to sort by timestamp
export const sortPulsesByTimestamp = (pulses) => {
  return [...pulses].sort((a, b) => b.timestamp - a.timestamp);
};
