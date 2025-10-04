import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { SmartLink, ProductLink, NavigationLink, ActionLink } from '../SmartLink'

describe('SmartLink', () => {
  it('renders with default props', () => {
    render(<SmartLink>Test Link</SmartLink>)
    expect(screen.getByText('Test Link')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<SmartLink variant="primary">Primary</SmartLink>)
    expect(screen.getByText('Primary')).toHaveClass('text-primary-600', 'hover:text-primary-700')

    rerender(<SmartLink variant="success">Success</SmartLink>)
    expect(screen.getByText('Success')).toHaveClass('text-green-600', 'hover:text-green-700')

    rerender(<SmartLink variant="destructive">Destructive</SmartLink>)
    expect(screen.getByText('Destructive')).toHaveClass('text-red-600', 'hover:text-red-700')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<SmartLink size="xs">XS Link</SmartLink>)
    expect(screen.getByText('XS Link')).toHaveClass('text-xs')

    rerender(<SmartLink size="sm">SM Link</SmartLink>)
    expect(screen.getByText('SM Link')).toHaveClass('text-sm')

    rerender(<SmartLink size="md">MD Link</SmartLink>)
    expect(screen.getByText('MD Link')).toHaveClass('text-base')

    rerender(<SmartLink size="lg">LG Link</SmartLink>)
    expect(screen.getByText('LG Link')).toHaveClass('text-lg')
  })

  it('renders with underline by default', () => {
    render(<SmartLink>Underlined</SmartLink>)
    expect(screen.getByText('Underlined')).toHaveClass('underline')
  })

  it('renders without underline when specified', () => {
    render(<SmartLink underline={false}>No Underline</SmartLink>)
    expect(screen.getByText('No Underline')).not.toHaveClass('underline')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<SmartLink onClick={handleClick}>Clickable</SmartLink>)
    
    const link = screen.getByText('Clickable')
    expect(link).toHaveClass('cursor-pointer')
    
    fireEvent.click(link)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables click when disabled', () => {
    const handleClick = jest.fn()
    render(<SmartLink onClick={handleClick} disabled>Disabled</SmartLink>)
    
    const link = screen.getByText('Disabled')
    expect(link).toHaveClass('opacity-50', 'cursor-not-allowed')
    
    fireEvent.click(link)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders as anchor when href is provided', () => {
    render(<SmartLink href="/test">Anchor Link</SmartLink>)
    const link = screen.getByText('Anchor Link')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('renders as button when onClick is provided', () => {
    const handleClick = jest.fn()
    render(<SmartLink onClick={handleClick}>Button Link</SmartLink>)
    const link = screen.getByText('Button Link')
    expect(link.tagName).toBe('BUTTON')
  })

  it('applies custom className', () => {
    render(<SmartLink className="custom-class">Custom</SmartLink>)
    expect(screen.getByText('Custom')).toHaveClass('custom-class')
  })

  it('has default styling for product links', () => {
    render(<SmartLink variant="default">Default</SmartLink>)
    expect(screen.getByText('Default')).toHaveClass('text-black', 'hover:text-primary-600')
  })
})

describe('ProductLink', () => {
  it('renders product name with default styling', () => {
    render(<ProductLink productName="Test Product" />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toHaveClass('text-black', 'hover:text-primary-600', 'underline')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<ProductLink productName="Test Product" onClick={handleClick} />)
    
    fireEvent.click(screen.getByText('Test Product'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom size', () => {
    render(<ProductLink productName="Test Product" size="lg" />)
    expect(screen.getByText('Test Product')).toHaveClass('text-lg')
  })

  it('applies custom className', () => {
    render(<ProductLink productName="Test Product" className="custom-class" />)
    expect(screen.getByText('Test Product')).toHaveClass('custom-class')
  })
})

describe('NavigationLink', () => {
  it('renders as anchor with href', () => {
    render(<NavigationLink href="/products">Products</NavigationLink>)
    const link = screen.getByText('Products')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/products')
  })

  it('renders with primary variant by default', () => {
    render(<NavigationLink href="/products">Products</NavigationLink>)
    expect(screen.getByText('Products')).toHaveClass('text-primary-600', 'hover:text-primary-700')
  })

  it('renders with custom variant', () => {
    render(<NavigationLink href="/products" variant="success">Products</NavigationLink>)
    expect(screen.getByText('Products')).toHaveClass('text-green-600', 'hover:text-green-700')
  })
})

describe('ActionLink', () => {
  it('renders as button with onClick', () => {
    const handleClick = jest.fn()
    render(<ActionLink onClick={handleClick}>Action</ActionLink>)
    const link = screen.getByText('Action')
    expect(link.tagName).toBe('BUTTON')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<ActionLink onClick={handleClick}>Action</ActionLink>)
    
    fireEvent.click(screen.getByText('Action'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with default variant', () => {
    const handleClick = jest.fn()
    render(<ActionLink onClick={handleClick}>Action</ActionLink>)
    expect(screen.getByText('Action')).toHaveClass('text-black', 'hover:text-primary-600')
  })

  it('can be disabled', () => {
    const handleClick = jest.fn()
    render(<ActionLink onClick={handleClick} disabled>Action</ActionLink>)
    expect(screen.getByText('Action')).toHaveClass('opacity-50', 'cursor-not-allowed')
  })
})
