import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { SmartTableToolbar } from '../SmartTableToolbar'
import type { ActionItem } from '../SmartTableActionPopover'

describe('SmartTableToolbar', () => {
  const mockBulkActions: ActionItem[] = [
    {
      label: 'Bulk Edit',
      onClick: jest.fn(),
      variant: 'default'
    },
    {
      label: 'Bulk Delete',
      onClick: jest.fn(),
      variant: 'destructive'
    }
  ]

  const mockChildren = <div data-testid="table-content">Table Content</div>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children content', () => {
    render(
      <SmartTableToolbar>
        {mockChildren}
      </SmartTableToolbar>
    )
    
    expect(screen.getByTestId('table-content')).toBeInTheDocument()
  })

  it('renders with default title when no title provided', () => {
    render(
      <SmartTableToolbar>
        {mockChildren}
      </SmartTableToolbar>
    )
    
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(
      <SmartTableToolbar title="Custom Title">
        {mockChildren}
      </SmartTableToolbar>
    )
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('renders actions when provided', () => {
    const customActions = (
      <button data-testid="custom-action">Custom Action</button>
    )
    
    render(
      <SmartTableToolbar actions={customActions}>
        {mockChildren}
      </SmartTableToolbar>
    )
    
    expect(screen.getByTestId('custom-action')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SmartTableToolbar className="custom-class">
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const card = container.querySelector('.bg-white')
    expect(card).toHaveClass('custom-class')
  })

  it('applies custom height when provided', () => {
    render(
      <SmartTableToolbar height="400px">
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const card = document.querySelector('.bg-white')
    expect(card).toHaveStyle('height: 400px')
  })

  it('applies custom height as number', () => {
    render(
      <SmartTableToolbar height={500}>
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const card = document.querySelector('.bg-white')
    expect(card).toHaveStyle('height: 500px')
  })

  it('applies custom minTableHeight when provided', () => {
    render(
      <SmartTableToolbar minTableHeight="300px">
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const tableContainer = document.querySelector('.bg-white.px-6.py-4')
    expect(tableContainer).toHaveStyle('min-height: 300px')
  })

  it('applies custom minTableHeight as number', () => {
    render(
      <SmartTableToolbar minTableHeight={350}>
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const tableContainer = document.querySelector('.bg-white.px-6.py-4')
    expect(tableContainer).toHaveStyle('min-height: 350px')
  })

  it('does not show bulk actions when no items selected', () => {
    render(
      <SmartTableToolbar 
        bulkActions={mockBulkActions}
        selectedItems={[]}
      >
        {mockChildren}
      </SmartTableToolbar>
    )
    
    // Bulk actions should not be visible
    expect(screen.queryByText('Bulk Edit')).not.toBeInTheDocument()
    expect(screen.queryByText('Bulk Delete')).not.toBeInTheDocument()
  })

  it('does not show bulk actions when bulkActions array is empty', () => {
    const selectedItems = [{ id: 1, name: 'Item 1' }]
    
    render(
      <SmartTableToolbar 
        bulkActions={[]}
        selectedItems={selectedItems}
      >
        {mockChildren}
      </SmartTableToolbar>
    )
    
    // Bulk actions should not be visible even with selected items
    expect(screen.queryByText('Bulk Edit')).not.toBeInTheDocument()
  })

  it('renders toolbar section when title, actions, or selected items are present', () => {
    render(
      <SmartTableToolbar title="Test Title">
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const toolbarSection = document.querySelector('.flex.items-center.justify-between.bg-white.p-4')
    expect(toolbarSection).toBeInTheDocument()
  })

  it('applies correct card styling', () => {
    render(
      <SmartTableToolbar>
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const card = document.querySelector('.bg-white')
    expect(card).toHaveClass(
      'shadow-lg',
      'border-0',
      'bg-white',
      'rounded-lg',
      'flex',
      'flex-col',
      'w-full',
      'max-w-full',
      'min-w-0'
    )
  })

  it('applies correct toolbar section styling', () => {
    render(
      <SmartTableToolbar title="Test">
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const toolbarSection = document.querySelector('.flex.items-center.justify-between.bg-white.p-4')
    expect(toolbarSection).toHaveClass(
      'flex',
      'items-center',
      'justify-between',
      'bg-white',
      'p-4',
      'rounded-t-lg',
      'border-b',
      'flex-shrink-0'
    )
  })

  it('applies correct table content styling', () => {
    render(
      <SmartTableToolbar>
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const tableContainer = document.querySelector('.bg-white.px-6.py-4')
    expect(tableContainer).toHaveClass(
      'bg-white',
      'px-6',
      'py-4',
      'rounded-b-lg',
      'flex-1',
      'min-w-0',
      'overflow-hidden',
      'min-h-0'
    )
  })

  it('renders title with correct styling', () => {
    render(
      <SmartTableToolbar title="Test Title">
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const title = screen.getByText('Test Title')
    expect(title).toHaveClass('text-lg', 'font-semibold', 'text-gray-800')
  })

  it('renders table content with overflow auto', () => {
    render(
      <SmartTableToolbar>
        {mockChildren}
      </SmartTableToolbar>
    )
    
    const tableContent = document.querySelector('.h-full.w-full.overflow-auto')
    expect(tableContent).toBeInTheDocument()
  })

  it('handles undefined selectedItems gracefully', () => {
    render(
      <SmartTableToolbar 
        bulkActions={mockBulkActions}
        selectedItems={undefined as any}
      >
        {mockChildren}
      </SmartTableToolbar>
    )
    
    // Should not crash and bulk actions should not be visible
    expect(screen.queryByText('Bulk Edit')).not.toBeInTheDocument()
  })

  it('handles undefined bulkActions gracefully', () => {
    const selectedItems = [{ id: 1, name: 'Item 1' }]
    
    render(
      <SmartTableToolbar 
        bulkActions={undefined as any}
        selectedItems={selectedItems}
      >
        {mockChildren}
      </SmartTableToolbar>
    )
    
    // Should not crash and bulk actions should not be visible
    expect(screen.queryByText('Bulk Edit')).not.toBeInTheDocument()
  })

  it('renders with all props provided', () => {
    const customActions = (
      <button data-testid="custom-action">Custom Action</button>
    )
    
    render(
      <SmartTableToolbar 
        title="Custom Title"
        actions={customActions}
        className="custom-class"
        height="400px"
        minTableHeight="300px"
      >
        {mockChildren}
      </SmartTableToolbar>
    )
    
    // Check all elements are rendered
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByTestId('custom-action')).toBeInTheDocument()
    expect(screen.getByTestId('table-content')).toBeInTheDocument()
  })

  it('handles empty selectedItems array', () => {
    render(
      <SmartTableToolbar 
        bulkActions={mockBulkActions}
        selectedItems={[]}
      >
        {mockChildren}
      </SmartTableToolbar>
    )
    
    expect(screen.getByTestId('table-content')).toBeInTheDocument()
  })

  it('handles multiple selected items', () => {
    const selectedItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
    
    render(
      <SmartTableToolbar 
        bulkActions={[]}
        selectedItems={selectedItems}
      >
        {mockChildren}
      </SmartTableToolbar>
    )
    
    expect(screen.getByTestId('table-content')).toBeInTheDocument()
  })
})
