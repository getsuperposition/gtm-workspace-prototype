# GTM Workspace Framework

A modern, AI-driven search interface built with Next.js and React. This application features a clean, intuitive design with a sidebar navigation and a centered search interface.

## 🚀 Features

- **AI-Driven Search Interface**: Large, prominent search box for querying accounts and contacts
- **Sidebar Navigation**: Fixed sidebar with navigation to multiple pages
  - Home
  - Search
  - Chats
  - Views
  - Notes
  - Meetings
- **Action Buttons**: Quick access buttons for common actions
  - Next best action
  - View
  - Meeting prep
  - Email
  - Buyer engagement map
- **Responsive Design**: Mobile-first approach with flexible layouts
- **CSS Modules**: Component-scoped styling with centralized global styles
- **Modern UI**: Clean design with hover effects and smooth transitions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation

1. Navigate to the project directory:
```bash
cd gtm-workspace-framework
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 📁 Project Structure

```
gtm-workspace-framework/
├── app/                          # Next.js App Router directory
│   ├── layout.js                 # Root layout with Sidebar
│   ├── page.js                   # Home page
│   ├── page.module.css           # Home page styles
│   ├── globals.css               # Global styles and CSS variables
│   ├── search/                   # Search page
│   │   ├── page.js
│   │   └── search.module.css
│   ├── chats/                    # Chats page
│   │   ├── page.js
│   │   └── chats.module.css
│   ├── views/                    # Views page
│   │   ├── page.js
│   │   └── views.module.css
│   ├── notes/                    # Notes page
│   │   ├── page.js
│   │   └── notes.module.css
│   └── meetings/                 # Meetings page
│       ├── page.js
│       └── meetings.module.css
├── components/                   # React components
│   ├── Sidebar/
│   │   ├── Sidebar.js
│   │   └── Sidebar.module.css
│   ├── SearchBox/
│   │   ├── SearchBox.js
│   │   └── SearchBox.module.css
│   └── ActionButtons/
│       ├── ActionButtons.js
│       └── ActionButtons.module.css
├── public/                       # Static assets
├── package.json                  # Project dependencies
├── next.config.mjs              # Next.js configuration
├── jsconfig.json                # JavaScript configuration
└── README.md                    # This file
```

## 🎨 Styling

The application uses a combination of:
- **Global CSS**: Centralized CSS variables for colors, spacing, typography, and more
- **CSS Modules**: Component-scoped styles to avoid naming conflicts

### CSS Variables

Key CSS variables defined in `globals.css`:
- Colors: `--color-primary`, `--color-background`, `--color-text-primary`, etc.
- Spacing: `--spacing-xs` through `--spacing-3xl`
- Font sizes: `--font-size-xs` through `--font-size-4xl`
- Border radius: `--radius-sm` through `--radius-full`
- Transitions: `--transition-fast`, `--transition-base`, `--transition-slow`

## 🧩 Components

### Sidebar
- Fixed position navigation on the left
- Active state highlighting for current page
- Includes Demo button and user avatar (RB)
- Help button in bottom right corner

### SearchBox
- Large, centered heading
- Input field with placeholder text
- Submit button with arrow icon
- Form submission handler (placeholder)

### ActionButtons
- Five action buttons with icons
- Hover effects for visual feedback
- No click functionality (placeholder for future implementation)

## 🔄 Routing

The application uses Next.js App Router with the following routes:
- `/` - Home page with search interface
- `/search` - Search page (placeholder)
- `/chats` - Chats page (placeholder)
- `/views` - Views page (placeholder)
- `/notes` - Notes page (placeholder)
- `/meetings` - Meetings page (placeholder)

All routes share the same layout with the Sidebar component.

## 🎯 Future Enhancements

The following features are planned for future development:
- [ ] Implement AI search functionality
- [ ] Add click handlers for action buttons
- [ ] Integrate with backend API
- [ ] Add user authentication
- [ ] Implement data fetching and state management
- [ ] Enhanced mobile responsive design (hamburger menu)
- [ ] Dark mode support
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Real-time chat functionality
- [ ] Meeting scheduling integration

## 🤝 Contributing

This is a work in progress. Additional pages and functionality will be added sequentially.

## 📝 Notes

- The search functionality is currently a placeholder and does not perform actual searches
- Action buttons have hover effects but no click functionality
- Placeholder pages display "This page is coming soon" messages
- Icons are currently using emoji characters (can be replaced with icon libraries like React Icons or Heroicons)

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can specify a different port:
```bash
npm run dev -- -p 3001
```

### Module Not Found Errors
If you encounter module not found errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Clear the Next.js cache:
```bash
rm -rf .next
npm run build
```

## 📄 License

This project is private and proprietary.

## 👤 Author

Created as part of the Workspace Redesign project.

---

**Built with ❤️ using Next.js and React**
