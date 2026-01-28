# Pulse Feed Redesign - Reference Analysis

**Date:** 2026-01-26
**Source:** Q1 Pulses designs (01-26-26-pulse-feed-queue)

---

## Core Concept: Artifact Workflow

Reps can action suggested artifacts from Pulse cards. Actions queue up as background tasks, then open in a canvas view for review/send.

### Flow
1. Rep sees pulse with suggested action (e.g., "Create Meeting Brief", "Draft Email")
2. Rep clicks action button
3. Button shows processing state (spinner + "Creating...")
4. Task appears in Tasks tab with progress
5. When complete, artifact is "Ready to review"
6. Rep opens artifact in canvas to review/edit/send

---

## Feed Tab Structure

### Primary Tabs
| Tab | Badge | Indicator |
|-----|-------|-----------|
| Open | `64` | Count of unactioned pulses |
| Saved | `3` | Bookmarked pulses |
| Tasks | `12` | Blue dot when processing + count |

### Tasks Sub-Filters
| Filter | Description |
|--------|-------------|
| ALL | Total task count |
| NEXT | Queued tasks |
| PROCESSING | Currently generating |
| DONE | Ready to review |

---

## Pulse Card Types

### 1. Assigned View
- Title: "Assigned a new View"
- Embedded: View card with icon, name, owner, account/contact counts
- No primary action (informational)

### 2. Meeting Prep
- Title: "Prepare for upcoming meeting"
- Metadata: Account logo, name, ARR, stage, recency
- Embedded: Meeting card with calendar icon, name, datetime, attendee count
- Primary action: "Create Meeting Brief" → artifact

### 3. Website Visits (Table)
- Title: "{count} website visits"
- Metadata: Account info + recency
- Description: Intent signal summary
- Data table:
  - Columns: VISITOR, VISITS, TOP PAGES, ACTION
  - Row action: "Draft Email" button per visitor
  - Pagination: "1-4 of 13" with prev/next

### 4. Key Promotions (Table)
- Title: "Key promotions"
- Subtitle: "{accounts} accounts  {contacts} contacts with title changes"
- Data table:
  - Columns: ACCOUNT, CONTACT, NEW ROLE, ACTION
  - Row action: "Draft Email" per contact
  - Pagination: "1-4 of 72"

### 5. New Hire Alert
- Title: "New C-level hire"
- Metadata: Account + ARR + stage + meeting indicator
- Description: Narrative about the hire and priorities
- Primary action: "Draft Email"

---

## Component Patterns

### Action Button States
1. **Default**: Solid dark button with icon + label
2. **Processing**: Spinner icon + "Creating {type}" label
3. **Disabled**: While processing

### Task Card States
1. **Queued**: Muted text, "QUEUED" label right-aligned
2. **Processing**: Icon + title, progress bar, time remaining
3. **Done**: Icon + title + version badge, "✓ Ready to review" label

### Progress Bar
- Indeterminate style (animated)
- Dark fill color
- Shows elapsed time (e.g., "3m 29s")

### Embedded Cards
- Subtle border, slightly elevated
- Icon prefix (calendar, grid, document)
- Chevron for navigation
- Metadata inline

### Data Tables
- Header row: uppercase labels, muted color
- Data rows: company logo, text, action button
- Pagination footer right-aligned

---

## Visual Tokens (observed)

### Typography
- Card title: ~18px semibold
- Timestamp: ~12px muted, after title
- Table headers: ~11px uppercase, letter-spacing
- Table data: ~14px

### Spacing
- Card padding: ~20px
- Section gap: ~16px
- Table row height: ~48px

### Colors
- Primary button: Dark navy (#1a2b4a approx)
- Active indicator: Blue dot
- Muted text: #6b7280
- Border: #e5e7eb

---

## Implementation Priority

### Phase 1: Core Infrastructure
1. Task queue context/state management
2. Task types and status enum
3. Action button component with states

### Phase 2: Pulse Card Updates
4. Embedded card components (View, Meeting)
5. Data table component with pagination
6. Updated FeedCard to support new layouts

### Phase 3: Tasks Tab
7. Tasks tab view with sub-filters
8. Task list grouped by source
9. Task card with progress states

### Phase 4: Canvas Integration
10. Artifact canvas view (separate feature)
