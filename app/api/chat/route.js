import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { message, threadId, pageContext } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response('Message is required', { status: 400 });
    }

    // Build context-aware system prompt
    const systemPrompt = buildSystemPrompt(pageContext);

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return mock response for prototype
      return new Response(getMockResponse(message, pageContext), {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Use Vercel AI SDK for streaming
    const result = streamText({
      model: openai('gpt-4-turbo'),
      system: systemPrompt,
      messages: [{ role: 'user', content: message }],
    });

    // Return streaming response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

/**
 * Build a context-aware system prompt based on the current page
 */
function buildSystemPrompt(pageContext) {
  const base = `You are an AI assistant for a Go-To-Market (GTM) workspace application. You help sales professionals with their accounts, signals, meetings, and tasks.

Keep your responses concise and actionable. Use bullet points when listing multiple items.`;

  if (!pageContext) return base;

  const { breadcrumb, pageType, entity } = pageContext;

  let contextAddition = '';

  switch (pageType) {
    case 'feed':
    case 'pulse':
      contextAddition = `

The user is currently viewing the Feed, which shows real-time signals and updates about their accounts. Help them understand and act on these signals.`;
      break;
    case 'view':
    case 'views':
      contextAddition = `

The user is currently viewing a saved View${entity?.name ? ` called "${entity.name}"` : ''}, which is a filtered list of accounts. Help them analyze and take action on these accounts.`;
      break;
    case 'meetings':
      contextAddition = `

The user is viewing their Meetings. Help them prepare for upcoming meetings, review past meetings, or schedule new ones.`;
      break;
    case 'notes':
      contextAddition = `

The user is viewing their Notes. Help them organize, search, or create notes about their accounts and interactions.`;
      break;
    default:
      break;
  }

  return base + contextAddition;
}

/**
 * Generate a mock response for prototyping (when no API key is configured)
 */
function getMockResponse(message, pageContext) {
  const lowerMessage = message.toLowerCase();

  // Meeting-related prompts
  if (lowerMessage.includes('meeting') || lowerMessage.includes('prepare') || lowerMessage.includes('brief')) {
    return `Here's a pre-meeting brief for the upcoming meeting with Dell Technologies. I've analyzed their top pain points, market opportunity, and provided a meeting participant deep dive.

Would you like to clarify any of the information in the generated artifact?`;
  }

  // Email-related prompts
  if (lowerMessage.includes('email') || lowerMessage.includes('outreach') || lowerMessage.includes('campaign')) {
    return `Okay, I'll find your new contacts on LinkedIn who also attended the US Manufacturing Conference on September 19, 2025.

Here's the email campaign to review.`;
  }

  // Account/company analysis
  if (lowerMessage.includes('account') || lowerMessage.includes('company') || lowerMessage.includes('analysis')) {
    return `I've prepared a comprehensive account brief for Dell Technologies. This includes their key metrics, recent activity, opportunities, and potential risks.

What specific aspect would you like me to expand on?`;
  }

  // Table/data analysis
  if (lowerMessage.includes('table') || lowerMessage.includes('data') || lowerMessage.includes('manufacturing') || lowerMessage.includes('sector')) {
    return `I've analyzed the manufacturing companies across New England states. The data shows interesting patterns:

**New Hampshire – Balanced Manufacturing** (323 companies each for "hampshire" and "new"):
• **Diversified Portfolio:** Well-represented across multiple sectors
• **Mid-tier Specialization:** Strong presence in Electronics and Building Materials

**Northern New England** (Maine, Vermont, Rhode Island):
• **Resource-Based Industries:** Leadership in Pulp Paper (51), Food Beverage (232)
• **Traditional Manufacturing:** Furniture (45), Textiles Apparel (101)
• **Niche Specializations:** Boats Submarines (23), Sporting Goods (31)`;
  }

  // Summary prompts
  if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
    return `Here's a summary of the key points:

• **3 high-priority signals** detected today
• **Dell Technologies** showing increased engagement (+45%)
• **2 accounts** need immediate attention (renewal coming up)
• **Meeting tomorrow** with Acme Corp - brief prepared

Would you like me to dive deeper into any of these?`;
  }

  if (lowerMessage.includes('attention')) {
    return `Based on recent signals, here are accounts that need attention:

1. **Dell Technologies** - Renewal in 30 days, engagement up 45%
2. **Acme Corporation** - New decision maker identified, schedule intro
3. **Globex Industries** - Competitor mentioned in recent call

Would you like me to create action items for any of these?`;
  }

  // Default response
  return `I can help you with:

• **Summarizing signals** - Get quick insights on your feed
• **Drafting emails** - Create personalized outreach
• **Account analysis** - Identify accounts needing attention
• **Meeting prep** - Get ready for your calls

What would you like to focus on?`;
}
