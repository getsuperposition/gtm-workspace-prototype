// Mock data for chat conversations - 5 example chats
export const mockChatData = [
  {
    id: 'chat-1',
    title: 'Q4 Renewal Strategy for Dell Technologies',
    createdAt: new Date('2026-01-20T10:30:00'),
    updatedAt: new Date('2026-01-22T14:45:00'),
    status: 'active',
    source: {
      type: 'action-button',
      actionLabel: 'Next best action'
    },
    companies: [
      { name: 'Dell Technologies', logo: null }
    ],
    companyCount: null,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'What is the best approach for our Q4 renewal with Dell Technologies?',
        timestamp: new Date('2026-01-20T10:30:00')
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'Based on the account data, I recommend focusing on three key areas for the Dell Technologies renewal:\n\n1. **Usage Analysis**: Their active user count has increased 23% over the past quarter\n2. **Expansion Opportunity**: The engineering team has been exploring premium features\n3. **Timeline**: Schedule executive review 45 days before renewal date\n\nWould you like me to prepare a detailed renewal strategy document?',
        timestamp: new Date('2026-01-20T10:30:15')
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'Yes, please prepare the strategy document.',
        timestamp: new Date('2026-01-20T10:32:00')
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: 'I\'ve prepared a comprehensive renewal strategy document. Here are the key sections:\n\n**Executive Summary**\n- Current contract value: $280k\n- Recommended renewal value: $350k (25% expansion)\n- Risk level: Low\n\n**Key Stakeholders**\n- Sarah Chen (VP Engineering) - Champion\n- Michael Smith (Tech Lead) - User\n- David Kim (Procurement) - Decision Maker\n\nWould you like me to schedule the executive review meeting?',
        timestamp: new Date('2026-01-20T10:33:00')
      }
    ],
    isUserCreated: false
  },
  {
    id: 'chat-2',
    title: 'Website visitor analysis for enterprise accounts',
    createdAt: new Date('2026-01-18T14:20:00'),
    updatedAt: new Date('2026-01-18T15:10:00'),
    status: 'active',
    source: {
      type: 'search',
      actionLabel: null
    },
    companies: [
      { name: 'Stripe', logo: null },
      { name: 'Notion', logo: null },
      { name: 'Snowflake', logo: null }
    ],
    companyCount: 3,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Show me website visitor analysis for our top enterprise accounts.',
        timestamp: new Date('2026-01-18T14:20:00')
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'I\'ve analyzed website activity for your top enterprise accounts. Here are the key findings:\n\n**High Intent Accounts (3)**\n- Stripe: 45 visits in past week, focused on pricing and API docs\n- Notion: 32 visits, exploring enterprise features\n- Snowflake: 28 visits, reviewing security documentation\n\nAll three accounts show strong buying signals. Would you like detailed visitor profiles?',
        timestamp: new Date('2026-01-18T14:20:30')
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'Yes, show me the detailed profiles for Stripe.',
        timestamp: new Date('2026-01-18T14:22:00')
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: '**Stripe Visitor Profile**\n\n**Key Visitors:**\n- Emma Thompson (Engineering Manager) - 12 visits\n- Robert Chen (Tech Lead) - 8 visits\n- Lisa Park (VP Engineering) - 5 visits\n\n**Top Pages:**\n1. /pricing/enterprise\n2. /api-documentation\n3. /security/compliance\n\n**Recommendation:** Schedule a technical demo focusing on API capabilities and enterprise security features.',
        timestamp: new Date('2026-01-18T14:22:30')
      }
    ],
    isUserCreated: false
  },
  {
    id: 'chat-3',
    title: 'Upsell opportunities for Q4',
    createdAt: new Date('2026-01-15T09:15:00'),
    updatedAt: new Date('2026-01-15T09:45:00'),
    status: 'active',
    source: {
      type: 'action-button',
      actionLabel: 'Review play'
    },
    companies: [
      { name: 'Atlassian', logo: null },
      { name: 'Amplitude', logo: null },
      { name: 'Netflix', logo: null },
      { name: 'Orange Bank', logo: null }
    ],
    companyCount: 4,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'What are the best upsell opportunities for Q4?',
        timestamp: new Date('2026-01-15T09:15:00')
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'I\'ve identified 4 high-priority upsell opportunities for Q4:\n\n**Tier 1 Opportunities:**\n1. Atlassian - $180k expansion potential (premium features)\n2. Amplitude - $120k expansion (additional seats)\n3. Netflix - $95k expansion (advanced analytics)\n4. Orange Bank - $75k expansion (security add-ons)\n\n**Total Potential:** $470k\n\nWould you like a detailed breakdown for any specific account?',
        timestamp: new Date('2026-01-15T09:15:30')
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'Tell me more about the Atlassian opportunity.',
        timestamp: new Date('2026-01-15T09:17:00')
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: '**Atlassian Upsell Analysis**\n\n**Current State:**\n- Contract Value: $280k/year\n- Active Users: 450 (85% adoption)\n- Current Tier: Professional\n\n**Opportunity:**\n- Upgrade to Enterprise tier\n- Add premium features package\n- Estimated value: $180k expansion\n\n**Key Drivers:**\n- Engineering team requesting advanced automation\n- Security team needs enhanced compliance features\n- 3 departments waiting for approval to expand usage\n\n**Next Steps:**\n1. Schedule demo of Enterprise features\n2. Prepare ROI analysis\n3. Engage with VP Engineering (champion)',
        timestamp: new Date('2026-01-15T09:17:45')
      }
    ],
    isUserCreated: false
  },
  {
    id: 'chat-4',
    title: 'Contact departure risk analysis',
    createdAt: new Date('2026-01-12T11:30:00'),
    updatedAt: new Date('2026-01-12T12:00:00'),
    status: 'active',
    source: {
      type: 'search',
      actionLabel: null
    },
    companies: [
      { name: 'Salesforce', logo: null }
    ],
    companyCount: null,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Analyze the risk from recent contact departures at Salesforce.',
        timestamp: new Date('2026-01-12T11:30:00')
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: '**Salesforce Contact Departure Analysis**\n\n**Recent Departures:**\n- Jennifer Wu (VP Engineering) - Left 2 weeks ago\n- Marcus Johnson (Tech Lead) - Left 1 week ago\n\n**Risk Assessment:** Medium-High\n\n**Impact:**\n- Lost 2 key champions\n- $450k renewal at risk (90 days out)\n- No current executive sponsor identified\n\n**Recommended Actions:**\n1. Identify new stakeholders immediately\n2. Schedule introduction meetings\n3. Provide value recap to new contacts\n4. Consider executive engagement strategy',
        timestamp: new Date('2026-01-12T11:30:30')
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'Who should we reach out to first?',
        timestamp: new Date('2026-01-12T11:35:00')
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: '**Priority Outreach List:**\n\n**1. Dr. Amanda Lee (Chief Data Scientist)**\n- Role: New technical decision maker\n- Priority: High\n- Approach: Technical value review + roadmap discussion\n\n**2. Robert Chang (ML Engineer)**\n- Role: Day-to-day user, potential champion\n- Priority: High\n- Approach: Product training + feature requests\n\n**3. Patricia Moore (Product Manager)**\n- Role: Business stakeholder\n- Priority: Medium\n- Approach: ROI review + use case expansion\n\n**Suggested Timeline:**\n- Week 1: Reach out to all three\n- Week 2: Schedule individual meetings\n- Week 3: Executive business review',
        timestamp: new Date('2026-01-12T11:36:00')
      }
    ],
    isUserCreated: false
  },
  {
    id: 'chat-5',
    title: 'Meeting preparation for Microsoft QBR',
    createdAt: new Date('2026-01-10T08:00:00'),
    updatedAt: new Date('2026-01-10T08:30:00'),
    status: 'active',
    source: {
      type: 'action-button',
      actionLabel: 'Prepare for meeting'
    },
    companies: [
      { name: 'Microsoft', logo: null }
    ],
    companyCount: null,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Help me prepare for the Microsoft quarterly business review next week.',
        timestamp: new Date('2026-01-10T08:00:00')
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: '**Microsoft QBR Preparation Brief**\n\n**Meeting Details:**\n- Date: Next Monday at 10am\n- Attendees: 8 executives\n- Duration: 90 minutes\n\n**Key Topics to Cover:**\n1. Q4 Performance Review\n2. ROI Analysis\n3. Usage Trends\n4. 2026 Strategic Initiatives\n5. Expansion Discussion (40% potential)\n\n**Account Health:**\n- Contract Value: $850k/year\n- User Adoption: 92%\n- NPS Score: 8.5/10\n- Expansion Opportunity: $340k\n\nWould you like me to prepare detailed slides for any section?',
        timestamp: new Date('2026-01-10T08:00:30')
      },
      {
        id: 'msg-3',
        role: 'user',
        content: 'Yes, prepare the ROI analysis section.',
        timestamp: new Date('2026-01-10T08:05:00')
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: '**ROI Analysis for Microsoft**\n\n**Investment:**\n- Annual Cost: $850k\n- Implementation: $50k (one-time)\n- Training: $25k\n\n**Measured Returns:**\n- Time Savings: $1.2M/year (estimated)\n- Efficiency Gains: 35% improvement in workflow\n- Error Reduction: 60% fewer manual errors\n- Team Productivity: +28% output increase\n\n**Net ROI: 142%**\n\n**Key Metrics:**\n- Payback Period: 8 months\n- 3-Year Value: $3.6M\n- Cost Avoidance: $450k/year\n\n**Testimonial:**\n"The platform has transformed how our Azure team operates. We\'ve seen measurable improvements across all key metrics." - Linda Chen, VP Cloud Services',
        timestamp: new Date('2026-01-10T08:06:00')
      }
    ],
    isUserCreated: false
  }
];

// Helper function to get all chats sorted by updatedAt (newest first)
export const getSortedChats = (chats) => {
  return [...chats].sort((a, b) => b.updatedAt - a.updatedAt);
};

// Helper function to get chat by ID
export const getChatById = (chats, id) => {
  return chats.find(chat => chat.id === id);
};
