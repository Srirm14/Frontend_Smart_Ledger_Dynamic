// Currency formatting utility for Indian Rupees
export const formatCurrency = (amount: number | string, locale: string = 'en-IN'): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (isNaN(numericAmount)) {
    return '₹0.00'
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount)
}

// Number formatting utility
export const formatNumber = (value: number | string, locale: string = 'en-IN'): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(numericValue)) {
    return '0'
  }

  return new Intl.NumberFormat(locale).format(numericValue)
}

// Date formatting utility
export const formatDate = (date: string | Date, locale: string = 'en-IN'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    return 'N/A'
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj)
}

// Percentage formatting utility
export const formatPercentage = (value: number | string, locale: string = 'en-IN'): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(numericValue)) {
    return '0%'
  }

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(numericValue / 100)
}

// Compact number formatting (e.g., 1.2K, 1.5M)
export const formatCompactNumber = (value: number | string, locale: string = 'en-IN'): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(numericValue)) {
    return '0'
  }

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(numericValue)
}

// Weight formatting utility
export const formatWeight = (value: number | string, unit: string = 'kg', locale: string = 'en-IN'): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(numericValue)) {
    return `0 ${unit}`
  }

  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(numericValue)} ${unit}`
}

// Volume formatting utility
export const formatVolume = (value: number | string, unit: string = 'L', locale: string = 'en-IN'): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(numericValue)) {
    return `0 ${unit}`
  }

  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(numericValue)} ${unit}`
}

// Default formatters object for easy access
export const Formatters = {
  currency: formatCurrency,
  number: formatNumber,
  date: formatDate,
  percentage: formatPercentage,
  compact: formatCompactNumber,
  weight: formatWeight,
  volume: formatVolume,
}

// Hook for using formatters with next-intl (simplified version)
export const useFormatters = () => {
  return {
    currency: formatCurrency,
    number: formatNumber,
    date: formatDate,
    percentage: formatPercentage,
    compact: formatCompactNumber,
    weight: formatWeight,
    volume: formatVolume,
  }
}