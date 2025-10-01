# Testing Guide for Smart Ledger ERP Frontend

This document provides comprehensive information about the testing setup for the Smart Ledger ERP frontend application.

## Testing Stack

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing
- **TypeScript**: Full type safety in tests

## Project Structure

```
src/
├── components/
│   └── ui/
│       └── button.test.tsx          # Component unit tests
├── hooks/
│   └── useFeatureLoader.test.ts     # Hook tests
├── store/
│   └── sector-store.test.ts         # Store tests
└── test-utils/
    └── test-utils.tsx               # Testing utilities

tests/
└── e2e/
    ├── onboarding.spec.ts           # Onboarding flow tests
    ├── sector-switching.spec.ts     # Sector management tests
    ├── feature-loading.spec.ts      # Dynamic feature loading tests
    └── chat-ai-features.spec.ts     # Chat & AI feature tests
```

## Running Tests

### Unit Tests (Jest)

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed
```

## Test Categories

### 1. Unit Tests

**Component Tests** (`src/components/ui/button.test.tsx`)
- Test component rendering
- Test user interactions
- Test prop variations
- Test accessibility

**Hook Tests** (`src/hooks/useFeatureLoader.test.ts`)
- Test hook behavior
- Test state changes
- Test side effects
- Test error handling

**Store Tests** (`src/store/sector-store.test.ts`)
- Test state management
- Test actions
- Test selectors
- Test persistence

### 2. Integration Tests

**Feature Integration** (`src/features/*/__tests__/`)
- Test feature module loading
- Test component interactions
- Test API integration
- Test error boundaries

### 3. End-to-End Tests

**User Flows** (`tests/e2e/`)
- Complete user journeys
- Cross-browser testing
- Real user interactions
- Performance testing

## Test Data and Mocking

### Mock Data (`src/test-utils/test-utils.tsx`)

```typescript
export const mockSectors = [
  {
    id: 'petrolBunk',
    name: 'Petrol Bunk',
    features: ['sales', 'inventory', 'credit'],
    isCustom: false,
  },
  // ... more sectors
]

export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  sectors: mockSectors,
  preferences: {
    theme: 'light',
    language: 'en',
  },
}
```

### API Mocking

```typescript
// Mock API responses in tests
jest.mock('../services/api-client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))
```

## Testing Best Practices

### 1. Test Structure (AAA Pattern)

```typescript
describe('Component Name', () => {
  it('should do something specific', () => {
    // Arrange
    const props = { /* test data */ }
    
    // Act
    render(<Component {...props} />)
    
    // Assert
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### 2. Test Data Attributes

Use `data-testid` for reliable element selection:

```tsx
<button data-testid="login-button">Login</button>
```

### 3. Async Testing

```typescript
// Wait for async operations
await waitFor(() => {
  expect(screen.getByText('Loaded content')).toBeInTheDocument()
})

// Wait for elements to appear/disappear
await expect(screen.getByTestId('loading')).not.toBeVisible()
```

### 4. Error Testing

```typescript
// Test error states
it('should handle API errors gracefully', async () => {
  // Mock API error
  mockApiClient.get.mockRejectedValue(new Error('API Error'))
  
  render(<Component />)
  
  await waitFor(() => {
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
  })
})
```

## Coverage Goals

- **Unit Tests**: 90%+ coverage for components and hooks
- **Integration Tests**: 80%+ coverage for feature modules
- **E2E Tests**: Cover all critical user flows

## Continuous Integration

Tests run automatically on:
- Pull requests
- Main branch pushes
- Release deployments

## Debugging Tests

### Jest Debugging

```bash
# Run specific test file
npm test button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"

# Debug mode
npm test -- --detectOpenHandles --forceExit
```

### Playwright Debugging

```bash
# Debug specific test
npx playwright test onboarding.spec.ts --debug

# Show test results
npx playwright show-report
```

## Performance Testing

### Bundle Size Testing

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

### Load Testing

```bash
# Run performance tests
npx playwright test --grep="performance"
```

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout or add proper waits
2. **Mock not working**: Check mock placement and scope
3. **E2E tests failing**: Verify test data and selectors
4. **Coverage not updating**: Clear cache and re-run tests

### Getting Help

- Check Jest documentation: https://jestjs.io/docs/getting-started
- Check Playwright documentation: https://playwright.dev/docs/intro
- Review test examples in the codebase
- Ask team members for assistance

## Future Enhancements

- [ ] Visual regression testing
- [ ] Performance benchmarking
- [ ] Accessibility testing automation
- [ ] Cross-browser compatibility matrix
- [ ] Test data management system
