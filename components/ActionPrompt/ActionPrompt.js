'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useChatContext } from '@/contexts/ChatContext';
import styles from './ActionPrompt.module.css';

const ActionPrompt = ({ actionType, onCancel }) => {
  const [userResponse, setUserResponse] = useState('');
  const { createChat } = useChatContext();
  const router = useRouter();

  // Define prompts and options for each action type
  const promptConfigs = {
    'Next best action': {
      question: 'Would you like next best actions for all accounts or a specific account?',
      placeholder: 'e.g., "All accounts" or "Salesforce account"',
      suggestions: ['All accounts', 'Specific account', 'Top 5 priority accounts']
    },
    'View': {
      question: 'What type of view would you like to create?',
      placeholder: 'e.g., "Renewals", "Upsells", "At-risk accounts"',
      suggestions: ['Renewals coming up', 'Upsell opportunities', 'At-risk accounts', 'Recent activity']
    },
    'Meeting prep': {
      question: 'Which upcoming meeting would you like to prepare for?',
      placeholder: 'e.g., "Next meeting" or "Meeting with Salesforce"',
      suggestions: ['Next scheduled meeting', 'Meeting with Salesforce tomorrow', 'All meetings this week']
    },
    'Email': {
      question: 'What kind of email would you like to create?',
      placeholder: 'e.g., "Follow-up email", "Introduction email"',
      suggestions: ['Follow-up email', 'Introduction email', 'Check-in email', 'Meeting request']
    },
    'Buyer engagement map': {
      question: 'Which product offering would you like to build a buyer engagement map for?',
      placeholder: 'e.g., "Enterprise plan" or "All products"',
      suggestions: ['Enterprise plan', 'Professional plan', 'All products', 'Specific account']
    }
  };

  const config = promptConfigs[actionType] || {
    question: `Please provide more details for ${actionType}`,
    placeholder: 'Enter your response...',
    suggestions: []
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userResponse.trim()) {
      // Create the full prompt combining action type and user response
      const fullPrompt = `${actionType}: ${userResponse.trim()}`;
      
      // Create new chat with action-button source
      const newChatId = createChat(fullPrompt, {
        type: 'action-button',
        actionLabel: actionType
      });
      
      // Navigate to chat detail page
      if (newChatId) {
        router.push(`/chats/${newChatId}`);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserResponse(suggestion);
  };

  return (
    <div className={styles.promptContainer}>
      <button
        className={`btn btn-ghost btn-icon-only ${styles.closeButton}`}
        onClick={onCancel}
        aria-label="Cancel and return to home"
      >
        <CloseOutlinedIcon sx={{ fontSize: 20 }} />
      </button>

      <div className={styles.promptContent}>
        {/* AI Question */}
        <h3 className={styles.questionBubble}>
          <div className={styles.bubbleContent}>
            {config.question}
          </div>
        </h3>

        {/* Suggestions */}
        {config.suggestions.length > 0 && (
          <div className={styles.suggestionsContainer}>
            {config.suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="btn btn-chip"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* User Input */}
        <form onSubmit={handleSubmit} className={styles.responseForm}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.responseInput}
              placeholder={config.placeholder}
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-ghost btn-icon-only btn-xl"
              aria-label="Submit response"
              disabled={!userResponse.trim()}
              style={{ backgroundColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)', marginLeft: 'var(--spacing-sm)' }}
            >
              <ArrowUpwardOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionPrompt;
