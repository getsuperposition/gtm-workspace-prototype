# Feed Components Audit - GTM Workspace V2

**Date:** 2026-01-26
**Auditor:** Claude
**Status:** Complete

---

## Executive Summary

Richard Ballermann's Feed system is well-architected with clear separation of concerns. The codebase uses CSS Modules with CSS Variables for consistent theming. There are several areas where alignment with Design OS guidelines would improve consistency.

---

## Component Inventory

### Core Components

| Component | Location | Purpose | Lines |
|-----------|----------|---------|-------|
| `FeedCard` | `FeedCard/FeedCard.js` | Main feed card with actions | 220 |
| `FeedItemSummaryCard` | `FeedItemSummaryCard/` | Compact summary variant | - |
| `AnimatedFeedCard` | `FeedCard/AnimatedFeedCard.js` | Motion wrapper | 100 |
| `ArchivedCardView` | `FeedCard/ArchivedCardView.js` | Archived state UI | 60 |
| `FeedCardSkeleton` | `FeedCard/FeedCardSkeleton.js` | Loading skeleton | 40 |

### Content Type Components

| Component | File | Use Case |
|-----------|------|----------|
| `MeetingBrief` | `content-types/MeetingBrief.js` | Meeting prep cards |
| `WebsiteVisits` | `content-types/WebsiteVisits.js` | Engagement tracking |
| `UpsellAcceleration` | `content-types/UpsellAcceleration.js` | Expansion opps |
| `Renewals` | `content-types/Renewals.js` | Renewal management |
| `ContactDepartures` | `content-types/ContactDepartures.js` | Contact changes |

### FeedElements (Shared)

| Component | File | Purpose |
|-----------|------|---------|
| `Tag` | `FeedElements/Tag.js` | Label badges |
| `CompanyLogo` | `FeedElements/CompanyLogo.js` | Company avatars |
| `SourceIndicator` | `FeedElements/SourceIndicator.js` | Data source badges |
| `FeedActionButton` | `FeedElements/FeedActionButton.js` | CTA buttons |

### Supporting Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Tabs` | `Tabs/Tabs.js` | Tab navigation |
| `FeedFilters` | `FeedFilters/` | Filter controls |
| `FeedActions` | `FeedActions/FeedActions.js` | Card footer actions |
| `FeedDetail` | `FeedDetail/` | Full detail view |

---

## Architecture Analysis

### Data Flow

```
Feed Page (app/feed/page.js)
    ├── State: allFeedItems, cardStates, activeTab
    ├── localStorage persistence via feedStateManager
    │
    └── Renders:
        ├── Tabs (Latest | Saved | Archived)
        ├── AnimatedFeedCard wrapper
        │   └── FeedItemSummaryCard
        │       ├── Tags
        │       ├── Title + Summary
        │       └── CTA Button
        └── Click → /feed/[id] detail page
```

### State Management

- **cardStates**: `Record<string, { isBookmarked, isArchived, bookmarkedAt, archivedAt }>`
- **localStorage persistence**: via `utils/feedStateManager.js`
- **Tab filtering**: Computed via `useMemo` based on cardStates

### Props Interface (FeedCard)

```javascript
{
  id: string,
  type: 'meeting' | 'website-visits' | 'upsell' | 'renewal' | 'contact-departure',
  tags: Array<{ label: string, variant: string, size?: string }>,
  title: string,
  content: object,  // Type-specific data
  sources: number,
  ctaLabel: string,
  currentTab: 'latest' | 'saved' | 'archived',
  isArchived: boolean,
  isBookmarked: boolean,
  onArchive: (id) => void,
  onUnarchive: (id) => void,
  onBookmarkChange: (id, isBookmarked) => void
}
```

---

## Design Token Analysis

### Current Tokens (globals.css)

**Spacing Scale:**
| Token | Value | Notes |
|-------|-------|-------|
| `--spacing-xs` | 0.25rem (4px) | ✓ Standard |
| `--spacing-sm` | 0.5rem (8px) | ✓ Standard |
| `--spacing-md` | 1rem (16px) | ✓ Standard |
| `--spacing-lg` | 1.5rem (24px) | ✓ Standard |
| `--spacing-xl` | 2rem (32px) | ✓ Standard |

**Typography Scale:**
| Token | Value | Notes |
|-------|-------|-------|
| `--font-size-2xs` | 0.6875rem (11px) | Non-standard |
| `--font-size-xs` | 0.75rem (12px) | ✓ Standard |
| `--font-size-sm` | 0.875rem (14px) | ✓ Standard |
| `--font-size-base` | 1rem (16px) | ✓ Standard |

**Border Radius:**
| Token | Value | Notes |
|-------|-------|-------|
| `--radius-sm` | 0.25rem (4px) | ✓ |
| `--radius-md` | 0.5rem (8px) | ✓ |
| `--radius-lg` | 0.75rem (12px) | ✓ |
| `--radius-xl` | 1rem (16px) | ✓ |

**Colors:**
- Primary: `#0B1123` (dark navy)
- Brand: `#ea1b15` (ZoomInfo red)
- Brand Purple: `#a109ba`
- Background: `#fcfcfc`
- Text Primary: `#2d2d2d`
- Text Secondary: `#626367`

---

## Design OS Guideline Gaps

### Critical Issues

1. **Global transition on all elements** (Line 137 globals.css)
   ```css
   *, *::before, *::after {
     transition: all 750ms cubic-bezier(0.075, 0.82, 0.165, 1);
   }
   ```
   - **Violation:** "NEVER: `transition: all` - list properties explicitly"
   - **Impact:** Performance, unexpected animations
   - **Fix:** Remove global transition, apply specific transitions per component

2. **Hardcoded colors in component CSS**
   - Tag.module.css lines 33-50: Hardcoded hex values for warning/danger
   - FeedCard.module.css lines 51-68: Hardcoded blue/red for like/dislike
   - **Violation:** "SHOULD use existing theme or Tailwind CSS color tokens"
   - **Fix:** Move to CSS variables in globals.css

3. **Missing tabular-nums for data**
   - Counts, timestamps not using `font-variant-numeric: tabular-nums`
   - **Violation:** "MUST use tabular-nums for data"

### Moderate Issues

4. **Button hover transforms**
   - `.btn-primary:hover { transform: scale(1.05); }`
   - **Concern:** May feel excessive, could use subtle opacity change instead

5. **Icon sizing via MUI sx prop**
   - `sx={{ fontSize: 20 }}` scattered throughout
   - **Concern:** Inconsistent, should use size tokens

6. **Missing aria-labels on some interactive elements**
   - Filter button has label, but some icon buttons lack descriptive labels

7. **No text-balance on headings**
   - Feed card titles could benefit from `text-wrap: balance`

### Minor Issues

8. **Inconsistent class naming**
   - Mix of `camelCase` and `kebab-case` in CSS modules
   - Example: `.feedCard` vs `.card-header` patterns

9. **Max-width on tags**
   - `.sm { max-width: 100px }` could truncate important labels
   - Should use `truncate` utility with tooltip on overflow

---

## Component Quality Assessment

| Component | Structure | Accessibility | Styling | Score |
|-----------|-----------|---------------|---------|-------|
| FeedCard | ✓ Good | ✓ Has aria-labels | ⚠ Hardcoded colors | 7/10 |
| Tag | ✓ Simple | ⚠ No role | ⚠ Hardcoded colors | 6/10 |
| FeedActions | ✓ Clean | ✓ Good | ✓ Uses tokens | 8/10 |
| Tabs | ✓ Good | ⚠ Check focus | ✓ Uses tokens | 7/10 |
| AnimatedFeedCard | ✓ Clean | N/A | ✓ Good | 8/10 |

---

## Recommendations

### Immediate (Before Design Updates)

1. **Remove global `transition: all`** - High impact fix
2. **Add `tabular-nums`** to timestamp and count displays
3. **Consolidate hardcoded colors** into CSS variables

### With Design Updates

4. **Standardize icon sizes** - Create icon size tokens
5. **Add `text-balance`** to card titles
6. **Enhance focus states** - Ensure visible focus rings

### Future Considerations

7. **Consider Tailwind migration** for consistency with Design OS
8. **Add loading states** for CTA button actions
9. **Implement toast notifications** for bookmark/archive feedback

---

## File Index

```
components/
├── FeedCard/
│   ├── FeedCard.js              # Main card component
│   ├── FeedCard.module.css      # Card styles
│   ├── AnimatedFeedCard.js      # Motion wrapper
│   ├── AnimatedFeedCard.module.css
│   ├── ArchivedCardView.js      # Archived state
│   ├── ArchivedCardView.module.css
│   ├── FeedCardSkeleton.js      # Loading state
│   ├── FeedCardSkeleton.module.css
│   ├── content-types/
│   │   ├── MeetingBrief.js
│   │   ├── WebsiteVisits.js
│   │   ├── UpsellAcceleration.js
│   │   ├── Renewals.js
│   │   ├── ContactDepartures.js
│   │   └── ContentTypes.module.css
│   └── preview/
├── FeedElements/
│   ├── Tag.js
│   ├── Tag.module.css
│   ├── CompanyLogo.js
│   ├── CompanyLogo.module.css
│   ├── SourceIndicator.js
│   ├── SourceIndicator.module.css
│   └── FeedActionButton.js
├── FeedActions/
│   ├── FeedActions.js
│   └── FeedActions.module.css
├── FeedItemSummaryCard/
│   ├── FeedItemSummaryCard.js
│   └── FeedItemSummaryCard.module.css
├── FeedFilters/
├── FeedDetail/
└── Tabs/
    ├── Tabs.js
    └── Tabs.module.css
```

---

## Next Steps

1. ✅ Audit complete
2. ⏳ Await reference designs from stakeholder
3. 🔜 Apply Design OS token updates
4. 🔜 Implement visual refresh based on reference designs
