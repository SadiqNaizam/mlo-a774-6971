import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface CuisineCategoryChipProps {
  /**
   * The name of the cuisine to display.
   */
  cuisine: string;
  /**
   * Whether the chip is currently selected.
   * @default false
   */
  isSelected?: boolean;
  /**
   * Callback function triggered when the chip is clicked.
   * Receives the cuisine name as an argument.
   */
  onClick?: (cuisine: string) => void;
  /**
   * Optional additional CSS classes to apply to the chip.
   */
  className?: string;
}

const CuisineCategoryChip: React.FC<CuisineCategoryChipProps> = ({
  cuisine,
  isSelected = false,
  onClick,
  className,
}) => {
  console.log(`CuisineCategoryChip loaded for: ${cuisine}, selected: ${isSelected}`);

  const handleClick = () => {
    if (onClick) {
      onClick(cuisine);
    }
  };

  const baseClasses =
    "px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background";

  const selectedClasses =
    "bg-primary text-primary-foreground border-primary hover:bg-primary/90";
  
  const unselectedClasses =
    "bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        clsx(
          baseClasses,
          isSelected ? selectedClasses : unselectedClasses,
          className
        )
      )}
      aria-pressed={isSelected}
      aria-label={`Filter by ${cuisine} cuisine`}
    >
      {cuisine}
    </button>
  );
};

export default CuisineCategoryChip;