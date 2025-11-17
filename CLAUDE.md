# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Civil Rights Legal Toolkit** - a React-based web application providing legal resources, case search, violation reporting, and specialized tools for activists and journalists. The application integrates with CourtListener API for 1.8M+ legal cases and includes features for FOIA requests, police accountability tracking, and real-time monitoring.

**Important Note:** The codebase has merge conflicts (visible in App.jsx and package.json) that need to be resolved before making significant changes.

## Tech Stack

- **Frontend:** React 18 with JSX/TSX (mixed)
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3 with custom design system
- **Backend:** Express.js server (src/backend/server.js)
- **Database:** Supabase (with graceful fallback when unavailable)
- **Maps:** Leaflet/React-Leaflet
- **Charts:** Chart.js with react-chartjs-2
- **Document Generation:** jsPDF, html2canvas, html-to-image
- **TypeScript:** Partial adoption (mixed .jsx and .tsx files)

## Development Commands

### Essential Commands
```bash
npm run dev              # Start development server (port 5173)
npm run build            # Production build
npx vite build          # Alternative build command
```

### Backend Server
```bash
node src/backend/server.js  # Start Express API server (port 3001)
```

Note: This project does not appear to have test scripts configured in package.json.

## Architecture

### Component Organization

The application uses a **tab-based navigation system** with lazy-loaded major features:

**Main Tabs:**
- Ultimate Dashboard (UltimateDashboard.jsx)
- Police Accountability Database (PoliceAccountabilityDatabase.jsx)
- Investigative Tools (InvestigativeJournalismSuite.jsx)
- FOIA Requests (EnhancedFOIARequestTool.jsx)
- Real-Time Monitor (EnhancedRealTimeDashboard.jsx)
- Interactive Map (EnhancedInteractive3DMap.jsx)
- AI Legal Assistant (AILegalAssistant.jsx)
- Resources & Laws (EnhancedResourcesAndLaws.jsx)

**Specialized Component Directories:**
- `src/components/activist/` - Activist-specific toolkits
- `src/components/journalist/` - Journalist-specific toolkits
- `src/components/state-profiles/` - State-specific legal profiles
- `src/components/maps/` - Map-related components (CircuitMap, etc.)
- `src/components/charts/` - Data visualization components
- `src/components/auth/` - Authentication components
- `src/components/admin/` - Admin moderation tools

### Context Providers

Located in `src/context/`:
- **AuthContext.jsx** - User authentication state
- **ThemeContext.jsx** - Dark/light theme management
- **SubscriptionContext.jsx** - User subscription tiers

### Backend Structure

Located in `src/backend/`:
- **server.js** - Express server with CORS, API proxy, admin auth
- **api-proxy.js** - Secure API key handling
- **violations-controller.js** - Violation reporting endpoints
- **affiliateController.js** - Affiliate/monetization system

### Database Schema

SQL schema files in `src/database/`:
- **SETUP_SUPABASE.sql** - Main database setup
- **community-schema.sql** - Community features
- **social-schema.sql** - Social networking features
- **violations-schema.sql** - Violation reporting schema
- **notification-triggers.sql** - Real-time notification system

### Services/APIs

Located in `src/services/`:
- **CourtListenerAPI.js** - Legal case search (1.8M+ cases)
- **CrimeDataAPI.ts** - Crime statistics integration
- **LegislativeTrackerAPI.js** - Legislative tracking
- **NewsAggregatorAPI.js** - News aggregation
- **WTPNewsAPI.js** - Custom news service
- **affiliateService.js** - Affiliate management

### Data Files

Located in `src/data/`:
- **civilRightsAttorneys.ts** - Attorney directory data
- **policeScannerFrequencies.ts** - Police scanner frequency data

## Key Features & Implementation Notes

### CourtListener Integration
- Main implementation: `src/components/EnhancedCaseExplorer.jsx`
- Provides access to 1,798,894+ civil rights cases
- Search filters: legal area, court, date range, precedential status
- API key configured via `VITE_COURTLISTENER_API_KEY` environment variable

### Supabase Graceful Degradation
- `src/lib/supabase.js` implements MockSupabaseClient
- Application functions without database when Supabase is unavailable
- Shows DatabaseUnavailableBanner.jsx when offline

### Admin Moderation System
- Password-protected admin panel (ADMIN_PASSWORD env var required)
- Session-based authentication with 24-hour tokens
- Endpoints in server.js use `verifyAdminSession` middleware

### Violation Reporting
- Users can report civil rights violations
- Stored via violations-controller.js endpoints
- Admin moderation via AdminModerationPanel.tsx

### Component Lazy Loading
- Major components wrapped with React.lazy()
- ErrorBoundary.jsx with withErrorBoundary HOC for all lazy components
- ComponentLoading fallback with skeleton UI

## Tailwind Configuration

Custom design system in `tailwind.config.js`:
- Custom color palette: primary, blue, purple, indigo, gray (50-950 shades)
- Custom animations: fade-in, fade-in-up, slide-in-right, bounce-slow, pulse-slow
- Custom box shadows: soft, medium, strong, glow, glow-lg
- Custom gradient backgrounds
- Extended spacing, border radius, z-index values

## Environment Variables

Required variables (see `.env.example`):
```
ADMIN_PASSWORD              # Admin panel password
VITE_SUPABASE_URL          # Supabase project URL
VITE_SUPABASE_ANON_KEY     # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY  # For server-side operations
VITE_COURTLISTENER_API_KEY # CourtListener API access
VITE_LEGISCAN_API_KEY      # Legislative tracking
VITE_NEWS_API_KEY          # News aggregation
```

## Path Aliases

TypeScript and Vite configured with path aliases:
- `@/*` maps to `src/*`
- Use: `import Component from '@/components/Component'`

## Build & Deployment

- **Node Version:** 20.x (specified in package.json engines)
- **Build Output:** `dist/` directory
- **Static Server:** Can use `serve` package (included in dependencies)
- **Netlify:** Configured with `netlify.toml` and `public/_redirects`
- **Production URL:** https://research.wtpnews.org

## Important Caveats

### Merge Conflicts
The repository currently has unresolved merge conflicts in:
- `src/App.jsx` (lines 15-19, 59-72)
- `package.json` (lines 15-19)

**Resolve these before making significant changes** to avoid build issues.

### Mixed File Extensions
The codebase mixes `.jsx`, `.tsx`, and `.js` files. When creating new components:
- Use `.tsx` for TypeScript components with JSX
- Match the pattern of similar existing components

### Express Backend
The backend server runs separately from Vite dev server:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- API routes are proxied via `src/backend/api-proxy.js`

### Component Naming Conventions
Many components have both base and "Enhanced" versions:
- `ComponentName.jsx` - Base version
- `EnhancedComponentName.jsx` - Feature-rich version
- Generally prefer the Enhanced versions for new features

## Common Patterns

### Error Boundaries
Wrap lazy-loaded components:
```javascript
const SafeComponent = withErrorBoundary(LazyComponent);
```

### Context Usage
```javascript
import { useAuth } from './context/AuthContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';

const { user, login, logout } = useAuth();
const { theme, toggleTheme } = useTheme();
```

### API Service Pattern
Services return promises with error handling:
```javascript
try {
  const data = await CourtListenerAPI.search(query);
  // handle data
} catch (error) {
  // handle error
}
```

## Additional Documentation

Reference these files for specific feature documentation:
- `FUNCTIONALITY_REPORT.md` - Complete feature status
- `COURTLISTENER_API_GUIDE.md` - CourtListener integration guide
- `FOIA_SYSTEM_DOCUMENTATION.md` - FOIA request system
- `SOCIAL_PLATFORM_GUIDE.md` - Social features
- `BACKEND_API_SETUP.md` - Backend setup guide
