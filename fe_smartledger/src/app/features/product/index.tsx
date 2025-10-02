"use client"

import { memo } from 'react'
import { ProductList } from '@/app/screens/features/product'

// Main Product Component - List Only
const ProductPage = memo(function ProductPage() {
  return <ProductList />
})

export default ProductPage