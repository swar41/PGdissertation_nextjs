import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  gaAction?: string; // Action name for tracking
};

export const Label = ({ children, className, gaAction, ...props }: LabelProps) => {
  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (gaAction) {
      console.log(`Label clicked: ${gaAction}`); // Replace with actual GA tracking logic
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'Label',
          event_label: gaAction, // Use the `gaAction` as the label for the event
        });
      }
    }
    // Trigger the original onClick handler passed via props
    props.onClick?.(e);
  };

  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className}`}
      onClick={handleClick} // Track click event
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
