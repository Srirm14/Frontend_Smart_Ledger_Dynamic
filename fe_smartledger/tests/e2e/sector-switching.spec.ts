import { test, expect } from '@playwright/test'

test.describe('Sector Switching', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to dashboard
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    
    // Wait for dashboard to load
    await page.waitForURL('/dashboard')
  })

  test('should display sector switcher in navigation', async ({ page }) => {
    await expect(page.locator('[data-testid="sector-switcher"]')).toBeVisible()
    await expect(page.locator('[data-testid="current-sector"]')).toContainText('Petrol Bunk')
  })

  test('should switch between sectors', async ({ page }) => {
    // Open sector switcher dropdown
    await page.click('[data-testid="sector-switcher"]')
    
    // Select pharmacy sector
    await page.click('[data-testid="sector-option-pharmacy"]')
    
    // Wait for sector switch to complete
    await page.waitForSelector('[data-testid="current-sector"]')
    
    // Verify sector has changed
    await expect(page.locator('[data-testid="current-sector"]')).toContainText('Pharmacy')
    
    // Verify features have updated
    await expect(page.locator('[data-testid="feature-inventory"]')).toBeVisible()
    await expect(page.locator('[data-testid="feature-sales"]')).toBeVisible()
  })

  test('should show loading state during sector switch', async ({ page }) => {
    // Open sector switcher
    await page.click('[data-testid="sector-switcher"]')
    
    // Click on a different sector
    await page.click('[data-testid="sector-option-departmental-store"]')
    
    // Should show loading indicator
    await expect(page.locator('[data-testid="sector-loading"]')).toBeVisible()
    
    // Wait for loading to complete
    await expect(page.locator('[data-testid="sector-loading"]')).not.toBeVisible()
  })

  test('should maintain user data across sector switches', async ({ page }) => {
    // Get initial user data
    const initialUserData = await page.evaluate(() => {
      return localStorage.getItem('user-data')
    })
    
    // Switch sector
    await page.click('[data-testid="sector-switcher"]')
    await page.click('[data-testid="sector-option-pharmacy"]')
    
    // Wait for switch to complete
    await page.waitForTimeout(1000)
    
    // Verify user data is still there
    const userDataAfterSwitch = await page.evaluate(() => {
      return localStorage.getItem('user-data')
    })
    
    expect(userDataAfterSwitch).toBe(initialUserData)
  })

  test('should handle sector switch errors gracefully', async ({ page }) => {
    // Mock network error for sector switch
    await page.route('**/api/sectors/switch', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      })
    })
    
    // Try to switch sector
    await page.click('[data-testid="sector-switcher"]')
    await page.click('[data-testid="sector-option-pharmacy"]')
    
    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Failed to switch sector')
  })
})
