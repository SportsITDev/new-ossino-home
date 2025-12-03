# Copilot Coding Agent Instructions for Ossino_fe

## Project Overview

Ossino FE is a modern React-based frontend application for an online casino platform. The application is built with TypeScript, uses Redux Toolkit for state management, and is styled with Tailwind CSS. It includes features for game management, user accounts, wallet transactions, live chat, and promotional content.

## Architecture & Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components built with Radix UI primitives and shadcn/ui patterns
- **Form Handling**: React Hook Form with Zod validation
- **API Client**: Axios with custom service layer
- **Real-time**: WebSocket integration for live chat
- **Development**: ESLint (Airbnb config) + Prettier for code quality

## File Structure & Organization

```
src/
├── api/                    # API service layer
│   ├── auth/              # Authentication services
│   ├── games/             # Game-related API calls
│   ├── wallet/            # Wallet/payment services
│   └── types/             # Shared API types
├── components/
│   ├── app/               # Root app components
│   ├── features/          # Feature-specific components
│   │   ├── auth/          # Authentication flows
│   │   ├── games/         # Game-related UI
│   │   ├── wallet/        # Wallet/payment UI
│   │   └── chat/          # Live chat functionality
│   ├── pages/             # Page-level components
│   ├── shared/            # Reusable components
│   │   ├── ui/            # Base UI components (Button, Input, etc.)
│   │   └── [others]/      # Complex shared components
├── store/                 # Redux store configuration
│   ├── [feature]/         # Feature-specific slices
│   └── index.ts           # Store configuration
├── styles/                # Global styles and Tailwind config
├── helpers/               # Utility functions
├── constants/             # Application constants
└── config/                # Configuration files
```

## Coding Standards & Conventions

### Component Patterns

1. **Functional Components**: Use React functional components with hooks
2. **TypeScript**: All components must be fully typed
3. **File Naming**: Use PascalCase for component files and folders
4. **Export Pattern**: Use default exports for components, named exports for utilities

```typescript
// Component structure example
interface ComponentProps {
  title: string;
  isActive?: boolean;
}

export default function Component({ title, isActive = false }: ComponentProps) {
  return <div className="component-class">{title}</div>;
}
```

### State Management

1. **Redux Toolkit**: Use createSlice for state management
2. **Async Actions**: Use createAsyncThunk for API calls
3. **Type Safety**: Define proper TypeScript interfaces for state

```typescript
// Slice pattern
interface FeatureState {
  data: SomeType[];
  loading: boolean;
  error: string | null;
}

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    // sync actions
  },
  extraReducers: (builder) => {
    // async actions with createAsyncThunk
  },
});
```

### Styling Patterns

1. **Tailwind CSS**: Primary styling approach
2. **Custom Design System**: Use defined color palette and spacing
3. **Component Variants**: Use class-variance-authority for component variants
4. **Responsive Design**: Mobile-first approach

```typescript
// Using cva for component variants
const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      outline: 'outline-classes',
    },
    size: {
      sm: 'small-classes',
      lg: 'large-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});
```

### Custom Design System

- **Primary Colors**: Uses neon accent colors (`text-neon-1`, `bg-neon-1`)
- **Gradients**: Custom button gradients (`bg-button-gradient`)
- **Status Colors**: Specific colors for different states (`text-status-error-100`)
- **Gaming Theme**: Dark theme with bright accents suitable for casino UI

## API Integration Patterns

1. **Service Layer**: Create dedicated API service files
2. **Type Safety**: Define interfaces for requests and responses
3. **Error Handling**: Consistent error handling across API calls
4. **Response Wrapping**: Use ServiceResponse type for API responses

```typescript
// API service pattern
export const gameApi = {
  async fetchGames(): Promise<ServiceResponse<Game[]>> {
    const response = await axiosClient.get('/games');
    return response.data;
  },
};
```

## Component Development Guidelines

### UI Components (src/components/shared/ui/)

- Follow shadcn/ui patterns
- Use Radix UI primitives when available
- Implement proper accessibility attributes
- Support variant-based styling with cva
- Include proper TypeScript interfaces

### Feature Components (src/components/features/)

- Group by feature domain (auth, games, wallet, etc.)
- Include necessary state management
- Handle loading and error states
- Implement proper form validation where needed

### Business Logic

- Keep components focused on presentation
- Move complex logic to custom hooks or utilities
- Use Redux for shared state
- Use React Hook Form for form state

## Common Patterns

### Loading States

```typescript
{loading ? <Loader /> : <Content />}
```

### Error Handling

- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information

```typescript
{error && <ErrorMessage message={error} />}
```

### Conditional Rendering

```typescript
{condition && <Component />}
{items.length > 0 ? <List items={items} /> : <NoItemsMessage />}
```

### Form Patterns

```typescript
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {},
});
```

## Domain-Specific Guidelines

### Gaming Features

- Game cards should include game metadata (title, provider, favorite status)
- Implement proper game launching mechanisms
- Handle game categories and filtering
- Support responsive game grids

### Wallet/Payment Features

- Always show loading states during transactions
- Implement proper form validation for financial inputs
- Use proper formatting for currency displays
- Handle various payment methods and statuses

### Chat Features

- Use WebSocket for real-time communication
- Implement proper message formatting
- Handle user mentions and emojis
- Support message persistence

### User Management

- Implement proper authentication flows
- Handle user profiles and preferences
- Support various user states (logged in, banned, etc.)
- Implement proper session management

## Testing Considerations

- Write tests for critical user flows
- Test error states and edge cases
- Mock API calls appropriately
- Test responsive behavior

## Performance Guidelines

- Use React.memo for expensive components
- Implement proper image optimization
- Use lazy loading for routes and heavy components
- Optimize bundle size with proper imports

## Security Guidelines

- Validate all user inputs
- Sanitize data before rendering
- Handle authentication tokens securely
- Implement proper CORS and CSP policies

## Accessibility Standards

- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works
- Maintain proper color contrast ratios
- Support screen readers

When working on this codebase, always consider the gaming/casino context, maintain consistency with the established patterns, and ensure that new code follows the TypeScript and styling conventions already in place.

For more details, see [Best practices for Copilot coding agent](https://gh.io/copilot-coding-agent-tips)

# Theme Configuration Guide

## Quick Theme Change

All primary colors are now centralized in `src/styles/theme.css`. To switch the entire project theme:

1. **Open** `src/styles/theme.css`
2. **Modify** the CSS variables in the `:root` section
3. **Save** - changes apply automatically across all components

## Theme Variables

### Primary Colors

- `--neon-1`, `--neon-2`, `--neon-3` - Main accent colors
- `--green-1`, `--green-2`, `--green-3` - Secondary accent colors
- `--pink` - Tertiary accent color

### Status Colors

- `--status-success`, `--status-error-100`, `--status-warning`, `--status-info`
- `--success-green`, `--failed-red`, `--pending-yellow`

### Background & Text

- `--bg-primary`, `--bg-secondary`, `--bg-tertiary` - Background colors
- `--text-primary`, `--text-secondary`, `--text-tertiary` - Text colors

### Gradients

All gradients are centralized with descriptive names:

- `--gradient-button` - Primary button gradient
- `--gradient-popup-success` - Success popup background
- `--gradient-refer-1`, `--gradient-refer-2` - Referral card backgrounds
- `--gradient-boost-level`, `--gradient-daily-races` - Promotion cards

## Example Theme Change

```css
:root {
  /* Change from green/neon theme to blue/purple theme */
  --neon-1: 220 100% 60%; /* Blue accent */
  --green-1: 270 80% 55%; /* Purple accent */
  --bg-primary: #0a0a2e; /* Dark blue background */
  --text-primary: #e6e6fa; /* Light purple text */
}
```

## Affected Components

**✅ Fully Themed (Auto-updating):**

- All UI components (buttons, inputs, cards)
- Header, sidebar, navigation
- Game cards and promotional content
- Wallet and transaction components
- Status indicators and notifications

**📋 Benefits:**

- Single file controls entire theme
- No need to modify individual components
- Consistent theming across all pages
- Easy A/B testing of different themes
