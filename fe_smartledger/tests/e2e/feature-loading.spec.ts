import { test, expect } from '@playwright/test'

test.describe('Dynamic Feature Loading', () => {
  test.beforeEach(async ({ page }) => {
    // Login and set up petrol bunk sector
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    await page.waitForURL('/dashboard')
  })

  test('should load sales feature for petrol bunk sector', async ({ page }) => {
    // Navigate to sales feature
    await page.click('[data-testid="nav-sales"]')
    
    // Should show loading state initially
    await expect(page.locator('[data-testid="feature-loading"]')).toBeVisible()
    
    // Wait for feature to load
    await expect(page.locator('[data-testid="sales-dashboard"]')).toBeVisible()
    await expect(page.locator('[data-testid="feature-loading"]')).not.toBeVisible()
    
    // Verify sales-specific components are loaded
    await expect(page.locator('[data-testid="fuel-sales-form"]')).toBeVisible()
    await expect(page.locator('[data-testid="sales-reports"]')).toBeVisible()
  })

  test('should load inventory feature with sector-specific data', async ({ page }) => {
    await page.click('[data-testid="nav-inventory"]')
    
    // Wait for inventory to load
    await expect(page.locator('[data-testid="inventory-dashboard"]')).toBeVisible()
    
    // Verify petrol bunk specific inventory items
    await expect(page.locator('[data-testid="fuel-inventory"]')).toBeVisible()
    await expect(page.locator('[data-testid="fuel-types"]')).toBeVisible()
  })

  test('should handle feature loading errors', async ({ page }) => {
    // Mock feature loading error
    await page.route('**/api/features/sales', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Feature loading failed' })
      })
    })
    
    await page.click('[data-testid="nav-sales"]')
    
    // Should show error state
    await expect(page.locator('[data-testid="feature-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible()
  })

  test('should cache loaded features', async ({ page }) => {
    // Load sales feature first time
    await page.click('[data-testid="nav-sales"]')
    await expect(page.locator('[data-testid="sales-dashboard"]')).toBeVisible()
    
    // Navigate away
    await page.click('[data-testid="nav-dashboard"]')
    
    // Navigate back to sales
    await page.click('[data-testid="nav-sales"]')
    
    // Should load instantly (from cache)
    await expect(page.locator('[data-testid="sales-dashboard"]')).toBeVisible()
    
    // Should not show loading state
    await expect(page.locator('[data-testid="feature-loading"]')).not.toBeVisible()
  })

  test('should load different features for different sectors', async ({ page }) => {
    // Start with petrol bunk (should have fuel-related features)
    await page.click('[data-testid="nav-sales"]')
    await expect(page.locator('[data-testid="fuel-sales-form"]')).toBeVisible()
    
    // Switch to pharmacy sector
    await page.click('[data-testid="sector-switcher"]')
    await page.click('[data-testid="sector-option-pharmacy"]')
    
    // Navigate to sales for pharmacy
    await page.click('[data-testid="nav-sales"]')
    
    // Should show pharmacy-specific sales features
    await expect(page.locator('[data-testid="medicine-sales-form"]')).toBeVisible()
    await expect(page.locator('[data-testid="prescription-management"]')).toBeVisible()
  })

  test('should show feature availability based on sector', async ({ page }) => {
    // For petrol bunk, certain features should be available
    await expect(page.locator('[data-testid="nav-sales"]')).toBeVisible()
    await expect(page.locator('[data-testid="nav-inventory"]')).toBeVisible()
    
    // Switch to a sector with limited features
    await page.click('[data-testid="sector-switcher"]')
    await page.click('[data-testid="sector-option-custom-limited"]')
    
    // Some features should not be available
    await expect(page.locator('[data-testid="nav-sales"]')).toBeVisible()
    await expect(page.locator('[data-testid="nav-inventory"]')).not.toBeVisible()
  })
})
