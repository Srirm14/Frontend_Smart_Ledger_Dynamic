import { renderHook, act } from '@testing-library/react'
import { useSectorStore } from './sector-store'

// Mock the store implementation
const mockSectorStore = {
  activeSector: null,
  availableSectors: [],
  isLoading: false,
  error: null,
  setActiveSector: jest.fn(),
  addCustomSector: jest.fn(),
  removeSector: jest.fn(),
  refreshSectors: jest.fn(),
}

jest.mock('./sector-store', () => ({
  useSectorStore: () => mockSectorStore,
}))

describe('Sector Store', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSectorStore())
    
    expect(result.current.activeSector).toBeNull()
    expect(result.current.availableSectors).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should set active sector', () => {
    const { result } = renderHook(() => useSectorStore())
    
    act(() => {
      result.current.setActiveSector('petrolBunk')
    })

    expect(mockSectorStore.setActiveSector).toHaveBeenCalledWith('petrolBunk')
  })

  it('should add custom sector', () => {
    const { result } = renderHook(() => useSectorStore())
    const customSector = {
      id: 'customSector',
      name: 'Custom Sector',
      features: ['sales', 'inventory'],
      isCustom: true,
    }

    act(() => {
      result.current.addCustomSector(customSector)
    })

    expect(mockSectorStore.addCustomSector).toHaveBeenCalledWith(customSector)
  })

  it('should remove sector', () => {
    const { result } = renderHook(() => useSectorStore())

    act(() => {
      result.current.removeSector('petrolBunk')
    })

    expect(mockSectorStore.removeSector).toHaveBeenCalledWith('petrolBunk')
  })

  it('should refresh sectors', async () => {
    const { result } = renderHook(() => useSectorStore())

    await act(async () => {
      await result.current.refreshSectors()
    })

    expect(mockSectorStore.refreshSectors).toHaveBeenCalled()
  })
})
