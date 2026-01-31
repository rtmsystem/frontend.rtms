# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RTMS (Real-Time Tournament Management System) is a Next.js 16 admin dashboard for managing tournaments. Built with React 19, TypeScript, Material-UI 6, and Tailwind CSS.

## Commands

```bash
npm run dev          # Start dev server with Turbopack (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run lint:fix     # Auto-fix lint issues
npm run format       # Prettier formatting
npm run build:icons  # Rebuild Iconify icon bundle (runs on postinstall)
```

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages with route groups
  - `(blank-layout-pages)/` - Guest pages (login)
  - `(dashboard)/(private)/` - Protected routes wrapped with AuthGuard
- `src/@core/` - Core design system: theme config, MUI customizations, Tailwind plugin
- `src/@layouts/` - Layout components (VerticalLayout, HorizontalLayout, BlankLayout)
- `src/@menu/` - Navigation menu system with context providers
- `src/views/` - Page-specific view components
- `src/components/` - Reusable React components
- `src/valibot/` - Form validation schemas (Valibot)
- `src/hocs/` - Higher-order components (AuthGuard, GuestOnlyRoute)

### Path Aliases

```typescript
@/*         → src/*
@core/*     → src/@core/*
@layouts/*  → src/@layouts/*
@menu/*     → src/@menu/*
@components/* → src/components/*
@configs/*  → src/configs/*
@views/*    → src/views/*
@assets/*   → src/assets/*
```

### Authentication

- NextAuth with JWT strategy (`src/libs/auth.ts`)
- Credentials provider: Backend login at `/auth/login/`
- Token refresh: Automatic refresh when token expires in < 1 minute
- Session extends with `accessToken`, `refreshToken`, `organizationId`

### API Calls

Use the `useAuthToken()` hook from `src/hooks/useAuthToken.ts`:

```typescript
const { fetchApi } = useAuthToken()
const response = await fetchApi('/endpoint', { method: 'POST', body: JSON.stringify(data) })
```

- Handles Bearer token automatically
- Auto-retries on 401 with token refresh
- FormData bodies handled correctly (no Content-Type override)

### Route Protection

Protected routes use the `AuthGuard` HOC which checks `getServerSession()` server-side:

```typescript
// In layout.tsx
export default async function Layout({ children }) {
  return <AuthGuard>{children}</AuthGuard>
}
```

### Form Validation

Schemas in `src/valibot/` using Valibot with React Hook Form:
- `auth-schema.ts` - Login validation
- `tournament-schema.ts` - Tournament creation/edit
- `player-profile-schema.ts` - Player profiles
- `division-schema.ts` - Division management
- `payment-schema.ts` - Payment forms

### State Management

- `TournamentContext` (`src/contexts/TournamentContext.tsx`) - Current tournament state
- `SettingsContext` (`src/@core/contexts/`) - Theme and layout preferences
- No Redux; uses React Context + hooks pattern

### Styling

Dual styling approach:
- MUI components with Emotion for component styling
- Tailwind CSS for utility classes with RTL logical properties support
- Theme configuration in `src/@core/theme/` and `src/configs/themeConfig.ts`

## Environment Variables

```
AUTH_SECRET                    # NextAuth secret
NEXT_PUBLIC_BACKEND_API_URL    # Backend API base URL
NEXT_PUBLIC_APP_URL            # Frontend app URL
BASEPATH                       # Optional base path for deployment
```

## Secondary App

`/test-management-admin` contains a separate Vite + React SPA for test management (excluded from main TypeScript config).
