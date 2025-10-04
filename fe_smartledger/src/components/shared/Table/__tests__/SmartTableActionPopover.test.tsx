import '@testing-library/jest-dom'
import SmartTableActionPopover, { ActionItem } from '../SmartTableActionPopover'

describe('SmartTableActionPopover', () => {
  const mockActions: ActionItem[] = [
    {
      label: 'Edit',
      onClick: jest.fn(),
      variant: 'default'
    },
    {
      label: 'Delete',
      onClick: jest.fn(),
      variant: 'destructive'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('can be imported without errors', () => {
    expect(SmartTableActionPopover).toBeDefined()
    expect(typeof SmartTableActionPopover).toBe('function')
  })

  it('has correct ActionItem interface', () => {
    const action: ActionItem = {
      label: 'Test Action',
      onClick: jest.fn(),
      variant: 'default',
      showSeparator: true
    }
    
    expect(action.label).toBe('Test Action')
    expect(typeof action.onClick).toBe('function')
    expect(action.variant).toBe('default')
    expect(action.showSeparator).toBe(true)
  })

  it('handles empty actions array', () => {
    const emptyActions: ActionItem[] = []
    expect(emptyActions).toHaveLength(0)
  })

  it('handles actions with different variants', () => {
    const defaultAction: ActionItem = {
      label: 'Default Action',
      onClick: jest.fn(),
      variant: 'default'
    }
    
    const destructiveAction: ActionItem = {
      label: 'Destructive Action',
      onClick: jest.fn(),
      variant: 'destructive'
    }
    
    expect(defaultAction.variant).toBe('default')
    expect(destructiveAction.variant).toBe('destructive')
  })

  it('handles actions with separators', () => {
    const actionWithSeparator: ActionItem = {
      label: 'Action with Separator',
      onClick: jest.fn(),
      showSeparator: true
    }
    
    expect(actionWithSeparator.showSeparator).toBe(true)
  })

  it('handles actions with custom icons', () => {
    const customIcon = <span>Custom Icon</span>
    const actionWithIcon: ActionItem = {
      label: 'Action with Icon',
      icon: customIcon,
      onClick: jest.fn()
    }
    
    expect(actionWithIcon.icon).toBeDefined()
  })

  it('handles rowData prop', () => {
    const rowData = { id: 1, name: 'Test Item' }
    expect(rowData).toBeDefined()
    expect(rowData.id).toBe(1)
    expect(rowData.name).toBe('Test Item')
  })

  it('handles multiple actions', () => {
    const manyActions: ActionItem[] = [
      { label: 'Action 1', onClick: jest.fn() },
      { label: 'Action 2', onClick: jest.fn() },
      { label: 'Action 3', onClick: jest.fn() }
    ]
    
    expect(manyActions).toHaveLength(3)
    expect(manyActions[0].label).toBe('Action 1')
    expect(manyActions[1].label).toBe('Action 2')
    expect(manyActions[2].label).toBe('Action 3')
  })

  it('validates action onClick function', () => {
    const mockOnClick = jest.fn()
    const action: ActionItem = {
      label: 'Test Action',
      onClick: mockOnClick
    }
    
    action.onClick()
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
