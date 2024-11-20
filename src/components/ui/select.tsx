import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options?: { value: string; label: string }[]; // List of options
  gaAction?: string; // Action name for tracking
};

export const Select = ({ options = [], className, gaAction, onChange, ...props }: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (gaAction) {
      const selectedValue = e.target.value;
      console.log(`Select option changed: ${gaAction} - ${selectedValue}`); // Replace with actual GA tracking logic
      if (window.gtag) {
        window.gtag('event', 'change', {
          event_category: 'Select',
          event_label: gaAction, // The label representing the action
          value: selectedValue, // Track the selected value
        });
      }
    }
    // Trigger the original onChange handler passed via props
    onChange?.(e);
  };

  return (
    <select
      className={`block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${className}`}
      onChange={handleChange} // Track change event
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
