import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { SmartBadge, StatusBadge, AvailabilityBadge, PriorityBadge } from '../SmartBadge'

describe('SmartBadge', () => {
  it('renders with default props', () => {
    render(<SmartBadge>Test Badge</SmartBadge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<SmartBadge variant="success">Success</SmartBadge>)
    expect(screen.getByText('Success')).toHaveClass('bg-green-100', 'text-green-800')

    rerender(<SmartBadge variant="destructive">Destructive</SmartBadge>)
    expect(screen.getByText('Destructive')).toHaveClass('bg-red-100', 'text-red-800')

    rerender(<SmartBadge variant="warning">Warning</SmartBadge>)
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<SmartBadge size="xs">XS Badge</SmartBadge>)
    expect(screen.getByText('XS Badge')).toHaveClass('px-1.5', 'py-0.5', 'text-xs')

    rerender(<SmartBadge size="sm">SM Badge</SmartBadge>)
    expect(screen.getByText('SM Badge')).toHaveClass('px-2', 'py-1', 'text-xs')

    rerender(<SmartBadge size="md">MD Badge</SmartBadge>)
    expect(screen.getByText('MD Badge')).toHaveClass('px-2.5', 'py-1.5', 'text-sm')

    rerender(<SmartBadge size="lg">LG Badge</SmartBadge>)
    expect(screen.getByText('LG Badge')).toHaveClass('px-3', 'py-2', 'text-base')
  })

  it('renders with icon on left', () => {
    render(<SmartBadge icon={CheckCircle} iconPosition="left">With Icon</SmartBadge>)
    expect(screen.getByText('With Icon')).toBeInTheDocument()
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('renders with icon on right', () => {
    render(<SmartBadge icon={CheckCircle} iconPosition="right">With Icon</SmartBadge>)
    expect(screen.getByText('With Icon')).toBeInTheDocument()
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<SmartBadge onClick={handleClick}>Clickable</SmartBadge>)
    
    const badge = screen.getByText('Clickable')
    expect(badge).toHaveClass('cursor-pointer')
    
    fireEvent.click(badge)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables click when disabled', () => {
    const handleClick = jest.fn()
    render(<SmartBadge onClick={handleClick} disabled>Disabled</SmartBadge>)
    
    const badge = screen.getByText('Disabled')
    expect(badge).toHaveClass('opacity-50', 'cursor-not-allowed')
    
    fireEvent.click(badge)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<SmartBadge className="custom-class">Custom</SmartBadge>)
    expect(screen.getByText('Custom')).toHaveClass('custom-class')
  })
})

describe('StatusBadge', () => {
  it('renders active status', () => {
    render(<StatusBadge status="active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Active')).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders inactive status', () => {
    render(<StatusBadge status="inactive" />)
    expect(screen.getByText('Inactive')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toHaveClass('bg-gray-100', 'text-gray-600')
  })

  it('renders pending status', () => {
    render(<StatusBadge status="pending" />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('renders completed status', () => {
    render(<StatusBadge status="completed" />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders failed status', () => {
    render(<StatusBadge status="failed" />)
    expect(screen.getByText('Failed')).toBeInTheDocument()
    expect(screen.getByText('Failed')).toHaveClass('bg-red-100', 'text-red-800')
  })

  it('renders warning status', () => {
    render(<StatusBadge status="warning" />)
    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('renders without icon when showIcon is false', () => {
    render(<StatusBadge status="active" showIcon={false} />)
    expect(screen.getByText('Active')).toBeInTheDocument()
    const icon = document.querySelector('svg')
    expect(icon).not.toBeInTheDocument()
  })

  it('renders with custom size', () => {
    render(<StatusBadge status="active" size="lg" />)
    expect(screen.getByText('Active')).toHaveClass('px-3', 'py-2', 'text-base')
  })
})

describe('AvailabilityBadge', () => {
  it('renders in-stock status', () => {
    render(<AvailabilityBadge availability="in-stock" />)
    expect(screen.getByText('In Stock')).toBeInTheDocument()
    expect(screen.getByText('In Stock')).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders limited status', () => {
    render(<AvailabilityBadge availability="limited" />)
    expect(screen.getByText('Limited')).toBeInTheDocument()
    expect(screen.getByText('Limited')).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('renders out-of-stock status', () => {
    render(<AvailabilityBadge availability="out-of-stock" />)
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
    expect(screen.getByText('Out of Stock')).toHaveClass('bg-red-100', 'text-red-800')
  })
})

describe('PriorityBadge', () => {
  it('renders low priority', () => {
    render(<PriorityBadge priority="low" />)
    expect(screen.getByText('Low')).toBeInTheDocument()
    expect(screen.getByText('Low')).toHaveClass('bg-gray-100', 'text-gray-600')
  })

  it('renders medium priority', () => {
    render(<PriorityBadge priority="medium" />)
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toHaveClass('bg-blue-100', 'text-blue-800')
  })

  it('renders high priority', () => {
    render(<PriorityBadge priority="high" />)
    expect(screen.getByText('High')).toBeInTheDocument()
    expect(screen.getByText('High')).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('renders urgent priority', () => {
    render(<PriorityBadge priority="urgent" />)
    expect(screen.getByText('Urgent')).toBeInTheDocument()
    expect(screen.getByText('Urgent')).toHaveClass('bg-red-100', 'text-red-800')
  })
})
