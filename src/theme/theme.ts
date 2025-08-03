export const theme = {
  colors: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  } as const,
  
  sizes: {
    small: 'px-3 py-1.5 text-sm',
    medium: 'w-full py-2',
    large: 'px-6 py-3 text-lg'
  } as const,

  ghost: {
    primary: 'bg-transparent text-gray-700 hover:bg-gray-100',
    danger: 'bg-transparent text-red-600 hover:bg-red-50'
  } as const,
  
  base: 'rounded-lg font-medium transition-colors shadow'
} as const;

export type ColorVariant = keyof typeof theme.colors;
export type SizeVariant = keyof typeof theme.sizes;