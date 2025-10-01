import { test, expect } from '@playwright/test'

test.describe('Chat & AI Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    await page.waitForURL('/dashboard')
  })

  test('should open chat interface', async ({ page }) => {
    await page.click('[data-testid="chat-toggle"]')
    
    await expect(page.locator('[data-testid="chat-panel"]')).toBeVisible()
    await expect(page.locator('[data-testid="chat-input"]')).toBeVisible()
    await expect(page.locator('[data-testid="send-button"]')).toBeVisible()
  })

  test('should send and receive chat messages', async ({ page }) => {
    await page.click('[data-testid="chat-toggle"]')
    
    // Send a message
    await page.fill('[data-testid="chat-input"]', 'Hello, I need help with sales')
    await page.click('[data-testid="send-button"]')
    
    // Should show user message
    await expect(page.locator('[data-testid="user-message"]').last()).toContainText('Hello, I need help with sales')
    
    // Should show AI response (mocked)
    await expect(page.locator('[data-testid="ai-message"]').last()).toBeVisible()
  })

  test('should handle AI-powered sector creation', async ({ page }) => {
    await page.click('[data-testid="chat-toggle"]')
    
    // Send AI prompt for custom sector
    await page.fill('[data-testid="chat-input"]', 'Create a custom sector for a restaurant with inventory, sales, and staff management')
    await page.click('[data-testid="send-button"]')
    
    // Should show AI processing
    await expect(page.locator('[data-testid="ai-processing"]')).toBeVisible()
    
    // Should create custom sector
    await expect(page.locator('[data-testid="custom-sector-created"]')).toBeVisible()
    
    // Should be able to switch to new sector
    await page.click('[data-testid="sector-switcher"]')
    await expect(page.locator('[data-testid="sector-option-restaurant"]')).toBeVisible()
  })

  test('should provide contextual help based on current sector', async ({ page }) => {
    // Set petrol bunk as active sector
    await page.click('[data-testid="sector-switcher"]')
    await page.click('[data-testid="sector-option-petrol-bunk"]')
    
    await page.click('[data-testid="chat-toggle"]')
    
    // Ask for help
    await page.fill('[data-testid="chat-input"]', 'How do I manage fuel inventory?')
    await page.click('[data-testid="send-button"]')
    
    // Should provide petrol bunk specific help
    await expect(page.locator('[data-testid="ai-message"]').last()).toContainText('fuel')
    await expect(page.locator('[data-testid="ai-message"]').last()).toContainText('petrol')
  })

  test('should handle real-time chat updates', async ({ page }) => {
    await page.click('[data-testid="chat-toggle"]')
    
    // Send initial message
    await page.fill('[data-testid="chat-input"]', 'Start a conversation')
    await page.click('[data-testid="send-button"]')
    
    // Mock incoming message
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('chat-message', {
        detail: {
          id: 'msg-123',
          content: 'This is a real-time message',
          sender: 'ai',
          timestamp: Date.now()
        }
      }))
    })
    
    // Should show new message
    await expect(page.locator('[data-testid="ai-message"]').last()).toContainText('This is a real-time message')
  })

  test('should support chat history persistence', async ({ page }) => {
    await page.click('[data-testid="chat-toggle"]')
    
    // Send a message
    await page.fill('[data-testid="chat-input"]', 'Important message to save')
    await page.click('[data-testid="send-button"]')
    
    // Close chat
    await page.click('[data-testid="chat-toggle"]')
    
    // Reopen chat
    await page.click('[data-testid="chat-toggle"]')
    
    // Should show previous message
    await expect(page.locator('[data-testid="user-message"]')).toContainText('Important message to save')
  })

  test('should handle chat errors gracefully', async ({ page }) => {
    // Mock chat API error
    await page.route('**/api/chat/send', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Chat service unavailable' })
      })
    })
    
    await page.click('[data-testid="chat-toggle"]')
    
    await page.fill('[data-testid="chat-input"]', 'Test message')
    await page.click('[data-testid="send-button"]')
    
    // Should show error message
    await expect(page.locator('[data-testid="chat-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="retry-chat-button"]')).toBeVisible()
  })
})
