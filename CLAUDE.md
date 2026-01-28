# GTM Workspace V2 - Visual Refresh

E2E visual refresh of the GTM Workspace platform.

## Project Context

This prototype focuses on:
1. **Pulse Feed** - Signal-driven feed with actionable cards
2. **Chat Sidebar (Agentic)** - Conversational AI assistant

## Design Direction

1. Start with Richard Ballermann's patterns (existing codebase)
2. Apply Design OS guidelines for consistency
3. Upgrade styles universally
4. Incorporate reference designs from stakeholder input

## Tech Stack

- Next.js 16 (App Router)
- React 19
- CSS Modules + CSS Variables
- MUI Icons
- Framer Motion

## Running the Prototype

```bash
cd portal/apps/gtm-workspace-v2
npm install
npm run dev
# Opens on http://localhost:3001
```

## Key Files

### Pulse Feed
- `components/FeedCard/` - Main feed card system
- `components/FeedElements/` - Tags, sources, actions
- `app/feed/` - Feed page with tabs

### Chat Sidebar
- `components/ChatCard/` - Chat preview cards
- `components/ChatInput/` - Message input
- `components/ChatDetail/` - Full chat view
- `app/chats/` - Chats page

### Global Styles
- `app/globals.css` - Design tokens and base styles

## Guidelines

Follow the Design OS CLAUDE.md guidelines:
- Minimal-diff bias
- Plan → Patch → Verify → Summarize
- Privacy and safety first

## Ralph Integration

PRD and progress tracking in `scripts/ralph/`:
- `prd.json` - User stories with acceptance criteria
- `progress.txt` - Learning log
