import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  gaAction?: string; // Action name for tracking
}

export const Button: React.FC<ButtonProps> = ({ children, variant, gaAction, ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-md text-black';
  const variantStyle = variant === 'outline' ? 'border border-blue-600 text-blue-600' : 'bg-blue-600';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gaAction) {
      console.log(`Button clicked: ${gaAction}`); // Replace with actual GA tracking logic
      // Example: window.gtag('event', 'click', { event_category: 'Button', event_label: gaAction });
    }
    props.onClick?.(e);
  };

  return (
    <button
      className={`${baseStyle} ${variantStyle}`}
      {...props}
      onClick={handleClick} // Attach the click handler
    >
      {children}
    </button>
  );
};
