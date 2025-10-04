import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SmartTable } from '../SmartTable'
import type { ColumnDef } from '@tanstack/react-table'

// Mock data for testing
interface TestData {
  id: number
  name: string
  email: string
  status: string
}

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
]

const mockColumns: ColumnDef<TestData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]

describe('SmartTable', () => {
  it('renders table with data', () => {
    render(<SmartTable data={mockData} columns={mockColumns} />)
    
    // Check if headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    
    // Check if data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders empty state when no data', () => {
    render(<SmartTable data={[]} columns={mockColumns} />)
    
    expect(screen.getByText('No data available')).toBeInTheDocument()
    expect(screen.getByText('There are no items to display at the moment.')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(<SmartTable data={mockData} columns={mockColumns} loading={true} />)
    
    // Should show loading spinner
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders with selection enabled', () => {
    render(<SmartTable data={mockData} columns={mockColumns} enableSelection={true} />)
    
    // Check if select all checkbox is present
    const selectAllCheckbox = screen.getByLabelText('Select all')
    expect(selectAllCheckbox).toBeInTheDocument()
    
    // Check if individual row checkboxes are present
    const rowCheckboxes = screen.getAllByLabelText('Select row')
    expect(rowCheckboxes).toHaveLength(mockData.length)
  })

  it('renders without selection when disabled', () => {
    render(<SmartTable data={mockData} columns={mockColumns} enableSelection={false} />)
    
    // Should not have select all checkbox
    expect(screen.queryByLabelText('Select all')).not.toBeInTheDocument()
    
    // Should not have individual row checkboxes
    expect(screen.queryByLabelText('Select row')).not.toBeInTheDocument()
  })

  it('handles row selection', async () => {
    const onRowSelect = jest.fn()
    render(
      <SmartTable 
        data={mockData} 
        columns={mockColumns} 
        enableSelection={true}
        onRowSelect={onRowSelect}
      />
    )
    
    // Select first row
    const firstRowCheckbox = screen.getAllByLabelText('Select row')[0]
    fireEvent.click(firstRowCheckbox)
    
    await waitFor(() => {
      expect(onRowSelect).toHaveBeenCalledWith([mockData[0]])
    })
  })

  it('handles select all functionality', async () => {
    const onRowSelect = jest.fn()
    render(
      <SmartTable 
        data={mockData} 
        columns={mockColumns} 
        enableSelection={true}
        onRowSelect={onRowSelect}
      />
    )
    
    // Select all rows
    const selectAllCheckbox = screen.getByLabelText('Select all')
    fireEvent.click(selectAllCheckbox)
    
    await waitFor(() => {
      expect(onRowSelect).toHaveBeenCalledWith(mockData)
    })
  })

  it('renders pagination when enabled', () => {
    render(<SmartTable data={mockData} columns={mockColumns} enablePagination={true} />)
    
    // Check if pagination controls are present
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('Showing page')).toBeInTheDocument()
  })

  it('renders without pagination when disabled', () => {
    render(<SmartTable data={mockData} columns={mockColumns} enablePagination={false} />)
    
    // Should not have pagination controls
    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
  })

  it('handles sorting when enabled', () => {
    const onSortChange = jest.fn()
    render(
      <SmartTable 
        data={mockData} 
        columns={mockColumns} 
        enableSorting={true}
        onSortChange={onSortChange}
      />
    )
    
    // Click on Name header to sort
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    
    expect(onSortChange).toHaveBeenCalled()
  })

  it('renders custom empty state', () => {
    const customEmptyState = <div>Custom empty message</div>
    render(
      <SmartTable 
        data={[]} 
        columns={mockColumns}
        children={customEmptyState}
      />
    )
    
    expect(screen.getByText('Custom empty message')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SmartTable 
        data={mockData} 
        columns={mockColumns}
        className="custom-class"
      />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with custom page size', () => {
    render(
      <SmartTable 
        data={mockData} 
        columns={mockColumns}
        pageSize={2}
        enablePagination={true}
      />
    )
    
    // Should show page size selector
    expect(screen.getByLabelText('Results per page')).toBeInTheDocument()
  })

  it('handles pagination change', async () => {
    const onPaginationChange = jest.fn()
    render(
      <SmartTable 
        data={mockData} 
        columns={mockColumns}
        enablePagination={true}
        onPaginationChange={onPaginationChange}
      />
    )
    
    // Click next page
    const nextButton = screen.getByLabelText('Go to next page')
    fireEvent.click(nextButton)
    
    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalled()
    })
  })

  it('displays selected rows count', async () => {
    render(
      <SmartTable 
        data={mockData} 
        columns={mockColumns}
        enableSelection={true}
        enablePagination={true}
      />
    )
    
    // Select first row
    const firstRowCheckbox = screen.getAllByLabelText('Select row')[0]
    fireEvent.click(firstRowCheckbox)
    
    await waitFor(() => {
      expect(screen.getByText('Total selected: 1')).toBeInTheDocument()
    })
  })

  it('renders sticky columns correctly', () => {
    const columnsWithSticky: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        meta: { sticky: 'left' }
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
    ]

    render(
      <SmartTable 
        data={mockData} 
        columns={columnsWithSticky}
        enableSelection={true}
      />
    )
    
    // Check if sticky column has correct attributes
    const stickyHeader = screen.getByText('Name').closest('th')
    expect(stickyHeader).toHaveAttribute('data-sticky', 'left')
  })
})
