import type { ReactNode } from 'react';
import { theme, type ColorVariant, type SizeVariant } from '@theme/theme';

interface ButtonCardProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: ColorVariant;
  size?: SizeVariant;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const ButtonCard = ({
  children,
  onClick,
  color = 'primary',
  type = 'button',
  size = 'medium',
  className = '',
  loading = false,
  disabled = false,
}: ButtonCardProps) => {

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${theme.base}
        ${theme.colors[color]}
        ${theme.sizes[size]}
        ${disabled || loading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonCard;