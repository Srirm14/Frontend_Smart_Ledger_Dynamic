
// Individual exports for specific categories
export const headings = {
  h1: "text-4xl font-bold text-gray-900 tracking-tight",
  h2: "text-3xl font-semibold text-gray-800 tracking-tight", 
  h3: "text-2xl font-semibold text-gray-700 tracking-tight",
  h4: "text-xl font-medium text-gray-700",
  h5: "text-lg font-medium text-gray-600",
  h6: "text-base font-medium text-gray-600",
}

export const labels = {
  primary: "text-sm font-semibold text-primary-600 uppercase tracking-wide",
  secondary: "text-xs font-medium text-gray-500 uppercase tracking-wider",
  tertiary: "text-sm font-medium text-gray-600",
  quaternary: "text-xs font-medium text-gray-500",
  muted: "text-xs text-gray-400",
}

export const buttons = {
  primary: "bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg shadow-purple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  secondary: "bg-white hover:bg-gray-50 text-primary-600 font-medium px-6 py-3 rounded-lg border border-primary-200 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  tertiary: "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  destructive: "bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
  ghost: "text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
}

export const cards = {
  elevated: "bg-white rounded-xl shadow-lg border border-gray-100 p-6",
  standard: "bg-white rounded-lg shadow-md border border-gray-200 p-4",
  subtle: "bg-gray-50 rounded-lg border border-gray-200 p-4",
  accent: "bg-primary-50 rounded-lg border border-primary-200 p-4",
  compact: "bg-white rounded-md shadow-sm border border-gray-200 p-3",
}

export const inputs = {
  large: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200",
  medium: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200",
  small: "w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200",
}

export const tables = {
  container: "w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
  header: "bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200",
  cell: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200",
  cellSecondary: "px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-gray-200",
}

export const navigation = {
  item: "flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-all duration-200",
  itemSecondary: "flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200",
  active: "flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md",
}

export const status = {
  active: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
  inactive: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800",
  pending: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
  error: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",
}

export const layout = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  containerMedium: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
  containerSmall: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
  sidebar: "w-64 bg-white shadow-lg border-r border-gray-200 h-full",
  mainContent: "flex-1 bg-gray-50 min-h-screen",
}

export const spacing = {
  sectionLarge: "py-8 px-4 sm:px-6 lg:px-8",
  sectionMedium: "py-6 px-4 sm:px-6 lg:px-8", 
  sectionSmall: "py-4 px-4 sm:px-6 lg:px-8",
  sectionCompact: "py-3 px-4 sm:px-6 lg:px-8",
  sectionTight: "py-2 px-4 sm:px-6 lg:px-8",
}

// Utility function to combine classes
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}
