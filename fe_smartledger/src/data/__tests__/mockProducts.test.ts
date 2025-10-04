import '@testing-library/jest-dom'
import { 
  mockPetrolBunkProducts, 
  getProductsByCategory, 
  getActiveProducts, 
  getProductsByAvailability, 
  searchProducts,
  type Product 
} from '../mockProducts'

describe('Mock Petrol Bunk Products', () => {
  it('should have products with all required fields', () => {
    expect(mockPetrolBunkProducts.length).toBeGreaterThan(0)
    
    mockPetrolBunkProducts.forEach(product => {
      expect(product.id).toBeDefined()
      expect(product.product_name).toBeDefined()
      expect(product.price).toBeDefined()
      expect(product.availability).toBeDefined()
      expect(product.category).toBeDefined()
      expect(product.sku).toBeDefined()
      expect(product.uom).toBeDefined()
      expect(product.supplier).toBeDefined()
      expect(product.stock_count).toBeDefined()
      expect(product.is_active).toBeDefined()
    })
  })

  it('should have products from different categories', () => {
    const categories = [...new Set(mockPetrolBunkProducts.map(p => p.category))]
    expect(categories).toContain('Fuel')
    expect(categories).toContain('Lubricants')
    expect(categories).toContain('Accessories')
    expect(categories).toContain('Tyres')
    expect(categories).toContain('Tools')
    expect(categories).toContain('Cleaning')
  })

  it('should have products with different availability statuses', () => {
    const availabilities = [...new Set(mockPetrolBunkProducts.map(p => p.availability))]
    expect(availabilities).toContain('In Stock')
    expect(availabilities).toContain('Limited')
    expect(availabilities).toContain('Out of Stock')
  })

  it('should have products with different UOMs', () => {
    const uoms = [...new Set(mockPetrolBunkProducts.map(p => p.uom))]
    expect(uoms).toContain('Liters')
    expect(uoms).toContain('Kg')
    expect(uoms).toContain('Pieces')
    expect(uoms).toContain('Sets')
    expect(uoms).toContain('Pairs')
  })

  it('should have realistic price ranges', () => {
    const prices = mockPetrolBunkProducts.map(p => parseFloat(p.price))
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    
    expect(minPrice).toBeGreaterThan(0)
    expect(maxPrice).toBeLessThan(10000) // Reasonable upper limit
  })

  it('should have realistic stock counts', () => {
    const stockCounts = mockPetrolBunkProducts.map(p => p.stock_count || 0)
    const maxStock = Math.max(...stockCounts)
    
    expect(maxStock).toBeLessThan(5000) // Reasonable upper limit
  })

  describe('Helper Functions', () => {
    it('getProductsByCategory should return correct products', () => {
      const fuelProducts = getProductsByCategory('Fuel')
      expect(fuelProducts.length).toBeGreaterThan(0)
      expect(fuelProducts.every(p => p.category === 'Fuel')).toBe(true)
      
      const lubricantProducts = getProductsByCategory('Lubricants')
      expect(lubricantProducts.length).toBeGreaterThan(0)
      expect(lubricantProducts.every(p => p.category === 'Lubricants')).toBe(true)
    })

    it('getActiveProducts should return only active products', () => {
      const activeProducts = getActiveProducts()
      expect(activeProducts.length).toBeGreaterThan(0)
      expect(activeProducts.every(p => p.is_active !== false)).toBe(true)
    })

    it('getProductsByAvailability should return correct products', () => {
      const inStockProducts = getProductsByAvailability('In Stock')
      expect(inStockProducts.length).toBeGreaterThan(0)
      expect(inStockProducts.every(p => p.availability === 'In Stock')).toBe(true)
      
      const limitedProducts = getProductsByAvailability('Limited')
      expect(limitedProducts.every(p => p.availability === 'Limited')).toBe(true)
      
      const outOfStockProducts = getProductsByAvailability('Out of Stock')
      expect(outOfStockProducts.every(p => p.availability === 'Out of Stock')).toBe(true)
    })

    it('searchProducts should find products by name', () => {
      const petrolResults = searchProducts('petrol')
      expect(petrolResults.length).toBeGreaterThan(0)
      expect(petrolResults.every(p => 
        p.product_name.toLowerCase().includes('petrol') ||
        p.description?.toLowerCase().includes('petrol')
      )).toBe(true)
    })

    it('searchProducts should find products by SKU', () => {
      const skuResults = searchProducts('SKU-1')
      expect(skuResults.length).toBeGreaterThan(0)
      expect(skuResults.every(p => p.sku?.includes('SKU-1'))).toBe(true)
    })

    it('searchProducts should find products by category', () => {
      const categoryResults = searchProducts('fuel')
      expect(categoryResults.length).toBeGreaterThan(0)
      expect(categoryResults.every(p => p.category?.toLowerCase().includes('fuel'))).toBe(true)
    })

    it('searchProducts should be case insensitive', () => {
      const upperCaseResults = searchProducts('PETROL')
      const lowerCaseResults = searchProducts('petrol')
      expect(upperCaseResults.length).toBe(lowerCaseResults.length)
    })
  })

  describe('Data Quality', () => {
    it('should have unique IDs', () => {
      const ids = mockPetrolBunkProducts.map(p => p.id)
      const uniqueIds = [...new Set(ids)]
      expect(ids.length).toBe(uniqueIds.length)
    })

    it('should have unique SKUs', () => {
      const skus = mockPetrolBunkProducts.map(p => p.sku).filter(Boolean)
      const uniqueSkus = [...new Set(skus)]
      expect(skus.length).toBe(uniqueSkus.length)
    })

    it('should have valid dates', () => {
      mockPetrolBunkProducts.forEach(product => {
        if (product.created_at) {
          expect(new Date(product.created_at)).toBeInstanceOf(Date)
          expect(new Date(product.created_at).getTime()).not.toBeNaN()
        }
        if (product.updated_at) {
          expect(new Date(product.updated_at)).toBeInstanceOf(Date)
          expect(new Date(product.updated_at).getTime()).not.toBeNaN()
        }
      })
    })

    it('should have valid price formats', () => {
      mockPetrolBunkProducts.forEach(product => {
        const price = parseFloat(product.price)
        expect(price).not.toBeNaN()
        expect(price).toBeGreaterThan(0)
      })
    })
  })

  describe('Business Logic', () => {
    it('should have fuel products with realistic prices', () => {
      const fuelProducts = getProductsByCategory('Fuel')
      fuelProducts.forEach(product => {
        const price = parseFloat(product.price)
        expect(price).toBeGreaterThan(50) // Minimum realistic fuel price
        expect(price).toBeLessThan(200) // Maximum realistic fuel price
      })
    })

    it('should have lubricants with appropriate UOMs', () => {
      const lubricantProducts = getProductsByCategory('Lubricants')
      lubricantProducts.forEach(product => {
        expect(['Liters', 'Pieces']).toContain(product.uom)
      })
    })

    it('should have accessories with appropriate UOMs', () => {
      const accessoryProducts = getProductsByCategory('Accessories')
      accessoryProducts.forEach(product => {
        expect(['Pieces', 'Sets', 'Pairs']).toContain(product.uom)
      })
    })

    it('should have tyres with appropriate UOMs', () => {
      const tyreProducts = getProductsByCategory('Tyres')
      tyreProducts.forEach(product => {
        expect(['Pieces']).toContain(product.uom)
      })
    })
  })
})
