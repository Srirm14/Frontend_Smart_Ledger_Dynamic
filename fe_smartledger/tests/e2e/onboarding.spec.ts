import { test, expect } from '@playwright/test'

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/onboarding')
  })

  test('should display onboarding page', async ({ page }) => {
    await expect(page).toHaveTitle(/Smart Ledger/)
    await expect(page.locator('h1')).toContainText('Welcome to Smart Ledger')
  })

  test('should show sector selection options', async ({ page }) => {
    // Check if sector options are displayed
    await expect(page.locator('[data-testid="sector-option-petrol-bunk"]')).toBeVisible()
    await expect(page.locator('[data-testid="sector-option-pharmacy"]')).toBeVisible()
    await expect(page.locator('[data-testid="sector-option-departmental-store"]')).toBeVisible()
  })

  test('should allow custom sector creation', async ({ page }) => {
    // Click on custom sector option
    await page.click('[data-testid="custom-sector-button"]')
    
    // Fill in custom sector details
    await page.fill('[data-testid="sector-name-input"]', 'My Custom Store')
    await page.fill('[data-testid="sector-description-input"]', 'A custom retail store')
    
    // Select features
    await page.check('[data-testid="feature-sales"]')
    await page.check('[data-testid="feature-inventory"]')
    
    // Submit form
    await page.click('[data-testid="create-sector-button"]')
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
  })

  test('should complete onboarding with predefined sector', async ({ page }) => {
    // Select petrol bunk sector
    await page.click('[data-testid="sector-option-petrol-bunk"]')
    
    // Click continue
    await page.click('[data-testid="continue-button"]')
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
  })

  test('should validate required fields in custom sector', async ({ page }) => {
    await page.click('[data-testid="custom-sector-button"]')
    
    // Try to submit without filling required fields
    await page.click('[data-testid="create-sector-button"]')
    
    // Should show validation errors
    await expect(page.locator('[data-testid="error-sector-name"]')).toBeVisible()
  })
})
