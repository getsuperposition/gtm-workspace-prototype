'use client';

import { usePageContext } from '@/contexts/PageContext';
import styles from './SuggestedPrompts.module.css';

// Context-aware prompts based on page type
const PROMPTS_BY_PAGE_TYPE = {
  feed: [
    "Summarize today's important signals",
    'Which accounts need attention?',
    'Draft a follow-up email for this pulse',
    "What's the sentiment trend this week?",
  ],
  pulse: [
    'Draft a response to this signal',
    'Find similar signals from this account',
    'Create a meeting brief',
    'What actions should I take?',
  ],
  views: [
    'Analyze accounts in this view',
    'Find common patterns',
    'Which accounts are at risk?',
    'Export this data to a spreadsheet',
  ],
  view: [
    'Summarize this view',
    'Which accounts need attention?',
    'Compare engagement trends',
    'Generate a report',
  ],
  meetings: [
    'Prepare for my next meeting',
    'Summarize meeting notes',
    'Draft follow-up tasks',
    'Who should I meet with this week?',
  ],
  notes: [
    'Organize my notes',
    'Find related notes',
    'Create action items from notes',
    'Summarize recent updates',
  ],
  default: [
    'What can you help me with?',
    'Summarize recent activity',
    'Draft an email',
    'Analyze my data',
  ],
};

const SuggestedPrompts = ({ onSelect }) => {
  const { pageType, entity } = usePageContext();

  // Get prompts for current context
  const prompts = PROMPTS_BY_PAGE_TYPE[pageType] || PROMPTS_BY_PAGE_TYPE.default;

  // Customize prompts with entity name if available
  const customizedPrompts = entity?.name
    ? prompts.map(prompt =>
        prompt.replace(/this (pulse|view|account)/gi, entity.name)
      )
    : prompts;

  return (
    <div className={styles.container}>
      <span className={styles.label}>Suggested</span>
      <div className={styles.prompts}>
        {customizedPrompts.slice(0, 4).map((prompt, index) => (
          <button
            key={index}
            className={styles.prompt}
            onClick={() => onSelect(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
