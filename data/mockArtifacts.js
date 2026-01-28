/**
 * Mock artifact data for the AI Chat panel
 * These represent generated artifacts that can be displayed in the canvas
 */

export const mockMeetingBrief = {
  id: 'artifact-meeting-brief-1',
  type: 'meetingBrief',
  title: 'Pre-meeting brief',
  version: 1,
  createdAt: Date.now(),
  content: {
    meetingContext: "Active customer with two Q4 2025 renewals in play (Best Case stage), plus ongoing strategic initiatives.",
    strategicFocusAreas: [
      "Position Copilot as a native enhancement to Smartsheet's SalesOps workflow",
      "Anchor conversations in metrics: time-to-ramp, email drafting reduction, and proactive risk detection",
      "Tailor messaging to executive concerns flagged in last sync with Tom & Shruti"
    ],
    mainCompetitors: [
      "Gong.io",
      "Outreach.io",
      "Salesforce Einstein GPT"
    ],
    painPoints: [
      {
        text: "Fragmented tools creating inefficiencies in sales enablement.",
        quote: {
          author: "Tom Langford",
          role: "VP of RevOps",
          text: "We're struggling to streamline our tech stack. Multiple platforms are causing confusion and slowing down our sales team.",
          sentiment: "negative"
        }
      },
      {
        text: "Limited visibility into customer sentiment and engagement levels causing delays in risk management.",
        quote: {
          author: "Tom Langford",
          role: "VP of RevOps",
          text: "We're struggling to streamline our tech stack. Multiple platforms are causing confusion and slowing down our sales team.",
          sentiment: "negative"
        }
      }
    ],
    attendees: [
      { name: "Sarah Chen", role: "VP Sales", notes: "Decision maker" },
      { name: "Mike Johnson", role: "IT Director", notes: "Technical evaluator" },
      { name: "Tom Langford", role: "VP of RevOps", notes: "Key stakeholder" }
    ],
    nextSteps: [
      "Schedule follow-up call to discuss implementation timeline",
      "Send ROI calculator customized for their use case",
      "Connect Sarah with reference customer in similar industry"
    ]
  }
};

export const mockEmailDraft = {
  id: 'artifact-email-draft-1',
  type: 'emailDraft',
  title: 'US Manufacturing Conference Outreach',
  version: 2,
  createdAt: Date.now(),
  content: {
    to: [{ name: "Sarah Carmichael", email: "sarah.carmichael@example.com" }],
    cc: [],
    subject: "Strategic Partnership Opportunity - Accelerating Smartsheet's Market Intelligence capabilities",
    body: `Good afternoon Sarah,

Congratulations on advancing bemdaneprocet to Phase III - a significant milestone for cell therapy development. As you scale from your 12-patient Phase I to a registrational trial, the infrastructure complexity increases exponentially. Having supported similar cell therapy companies through Phase III transitions, I see three critical areas that often create bottlenecks:

• Data integrity across multiple sites with real-time quality monitoring
• Regulatory reporting automation for FDA submissions and safety reporting
• Manufacturing integration bridging cell production to clinical data systems

Would you have 15 minutes next week to discuss your Phase III scaling priorities?`,
    signature: {
      name: "Jonathan Dixon",
      title: "VP of Engineering",
      email: "jonathan.dixon@techcorp.org"
    }
  }
};

export const mockAccountBrief = {
  id: 'artifact-account-brief-1',
  type: 'accountBrief',
  title: 'Dell Technologies Account Brief',
  version: 1,
  createdAt: Date.now(),
  content: {
    companyName: "Dell Technologies",
    industry: "Technology / Enterprise Hardware",
    overview: "Dell Technologies is a major enterprise hardware and solutions provider. They have been a customer since 2022 with significant expansion potential in their sales enablement division.",
    keyMetrics: [
      { label: "Annual Contract Value", value: "$450K", change: 15 },
      { label: "Health Score", value: "85", change: 5 },
      { label: "Engagement Score", value: "92", change: 12 },
      { label: "Days to Renewal", value: "45", change: null }
    ],
    recentActivity: [
      { text: "Meeting with VP Sales to discuss Q4 expansion", date: "2 days ago" },
      { text: "Support ticket resolved: API integration issue", date: "1 week ago" },
      { text: "Quarterly business review completed", date: "3 weeks ago" }
    ],
    opportunities: [
      "Expand into EMEA sales team (200+ users potential)",
      "Integration with their new CRM migration project",
      "Executive sponsorship opportunity with new CRO"
    ],
    risks: [
      "Budget constraints mentioned in last QBR",
      "Competitor (Gong) actively pursuing expansion deal",
      "Key champion (Tom) moving to different role"
    ],
    recommendations: [
      "Schedule executive alignment call before renewal",
      "Propose multi-year deal with volume discount",
      "Connect product team for roadmap discussion"
    ]
  }
};

export const mockTableArtifact = {
  id: 'artifact-table-1',
  type: 'table',
  title: 'Manufacturing Sub-Sectors by New England State',
  version: 1,
  createdAt: Date.now(),
  content: {
    title: "Manufacturing Companies in New England ($10M+)",
    description: "Analysis of manufacturing sub-sectors across New England states",
    columns: [
      { key: 'state', label: 'State', type: 'text' },
      { key: 'companies', label: 'Companies', type: 'number' },
      { key: 'topSector', label: 'Top Sector', type: 'text' },
      { key: 'avgRevenue', label: 'Avg Revenue', type: 'currency' },
      { key: 'growth', label: 'YoY Growth', type: 'percent' }
    ],
    rows: [
      { state: 'Massachusetts', companies: 423, topSector: 'Life Sciences', avgRevenue: 45000000, growth: 12 },
      { state: 'Connecticut', companies: 287, topSector: 'Aerospace', avgRevenue: 38000000, growth: 8 },
      { state: 'New Hampshire', companies: 323, topSector: 'Electronics', avgRevenue: 28000000, growth: 15 },
      { state: 'Rhode Island', companies: 156, topSector: 'Textiles', avgRevenue: 22000000, growth: 5 },
      { state: 'Maine', companies: 98, topSector: 'Food Beverage', avgRevenue: 18000000, growth: 7 },
      { state: 'Vermont', companies: 67, topSector: 'Furniture', avgRevenue: 15000000, growth: 3 }
    ],
    summary: "New Hampshire shows balanced manufacturing with 323 companies.\n\nDiversified Portfolio: Well-represented across multiple sectors.\nMid-tier Specialization: Strong presence in Electronics and Building Materials.\n\nNorthern New England (Maine, Vermont, Rhode Island):\nResource-Based Industries: Leadership in Pulp Paper (51), Food Beverage (232).\nTraditional Manufacturing: Furniture (45), Textiles Apparel (101).\nNiche Specializations: Boats Submarines (23), Sporting Goods (31)."
  }
};

/**
 * Get a mock artifact based on the user's message
 */
export function getArtifactForMessage(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('meeting') || lowerMessage.includes('prepare') || lowerMessage.includes('brief')) {
    return mockMeetingBrief;
  }

  if (lowerMessage.includes('email') || lowerMessage.includes('draft') || lowerMessage.includes('outreach')) {
    return mockEmailDraft;
  }

  if (lowerMessage.includes('account') || lowerMessage.includes('company') || lowerMessage.includes('analysis')) {
    return mockAccountBrief;
  }

  if (lowerMessage.includes('table') || lowerMessage.includes('data') || lowerMessage.includes('manufacturing') || lowerMessage.includes('sector')) {
    return mockTableArtifact;
  }

  return null;
}

/**
 * Get mock reasoning steps for a message
 */
export function getReasoningStepsForMessage(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('email') || lowerMessage.includes('outreach')) {
    return [
      { id: '1', title: 'Reasoning', status: 'complete' },
      { id: '2', title: 'Searching LinkedIn', status: 'complete' },
      { id: '3', title: 'Comparing to Workbook contacts', status: 'complete', detail: 'Selecting relevant contacts in Workbook' },
      { id: '4', title: 'Searching Conference Website for talking points', status: 'complete', detail: 'Customizing email content based on Workbook' },
      { id: '5', title: 'Creating a draft email', status: 'complete' }
    ];
  }

  if (lowerMessage.includes('meeting') || lowerMessage.includes('prepare')) {
    return [
      { id: '1', title: 'Analyzing account history', status: 'complete' },
      { id: '2', title: 'Reviewing recent communications', status: 'complete' },
      { id: '3', title: 'Identifying key stakeholders', status: 'complete' },
      { id: '4', title: 'Generating meeting brief', status: 'complete' }
    ];
  }

  return [];
}

/**
 * Generate an artifact for a completed task
 * This creates artifact content based on the task type and context
 */
export function generateArtifactForTask(task) {
  const { id, type, title, accountName, sourceTitle } = task;
  const artifactId = `artifact-${id}`;
  const now = Date.now();

  switch (type) {
    case 'meetingBrief':
      return {
        id: artifactId,
        type: 'meetingBrief',
        title: title || 'Meeting Brief',
        version: 1,
        createdAt: now,
        content: {
          meetingContext: `Pre-meeting preparation for ${accountName || 'upcoming meeting'}. ${sourceTitle ? `Related to: ${sourceTitle}` : ''}`,
          strategicFocusAreas: [
            "Position solution as enhancement to existing workflows",
            "Anchor conversations in concrete metrics and outcomes",
            "Tailor messaging to executive priorities flagged in recent discussions"
          ],
          mainCompetitors: [
            "Gong.io",
            "Outreach.io",
            "Salesforce Einstein GPT"
          ],
          painPoints: [
            {
              text: "Fragmented tools creating inefficiencies in sales enablement.",
              quote: {
                author: "Key Stakeholder",
                role: "VP of RevOps",
                text: "We're struggling to streamline our tech stack. Multiple platforms are causing confusion.",
                sentiment: "negative"
              }
            }
          ],
          attendees: [
            { name: "Sarah Chen", role: "VP Sales", notes: "Decision maker" },
            { name: "Mike Johnson", role: "IT Director", notes: "Technical evaluator" }
          ],
          nextSteps: [
            "Schedule follow-up call to discuss implementation",
            "Send ROI calculator customized for their use case",
            "Connect with reference customer in similar industry"
          ]
        }
      };

    case 'emailDraft':
      return {
        id: artifactId,
        type: 'emailDraft',
        title: title || 'Email Draft',
        version: 1,
        createdAt: now,
        content: {
          to: [{ name: accountName || "Contact", email: "contact@example.com" }],
          cc: [],
          subject: `Follow-up: ${sourceTitle || 'Our Discussion'}`,
          body: `Good afternoon,

Following up on our recent conversation regarding ${sourceTitle || 'potential collaboration'}. I wanted to share some thoughts on how we might move forward.

Based on our discussion, I see three key areas where we can add value:

• Streamlined workflow integration with your existing systems
• Enhanced visibility and reporting capabilities
• Scalable solution architecture for future growth

Would you have 15 minutes this week to discuss next steps?

Best regards`,
          signature: {
            name: "Your Name",
            title: "Account Executive",
            email: "you@company.com"
          }
        }
      };

    case 'analysis':
    case 'document':
    default:
      return {
        id: artifactId,
        type: 'document',
        title: title || 'Analysis',
        version: 1,
        createdAt: now,
        content: {
          sections: [
            {
              title: "Executive Summary",
              content: `This analysis covers key insights related to ${accountName || 'the account'} based on ${sourceTitle || 'recent activity'}.`
            },
            {
              title: "Key Findings",
              content: "Analysis of engagement patterns, competitive landscape, and opportunity areas."
            },
            {
              title: "Recommendations",
              content: "Strategic next steps and action items for the team."
            }
          ],
          summary: `Analysis generated for ${accountName || 'account'} on ${new Date(now).toLocaleDateString()}.`
        }
      };
  }
}
