import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; // Optional label for the textarea
  placeholder?: string;
  gaAction?: string; // Action name for tracking
}

const Textarea: React.FC<TextareaProps> = ({ label, placeholder, gaAction, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (gaAction) {
      const value = e.target.value;
      console.log(`Textarea changed: ${gaAction} - ${value}`); // Replace with actual GA tracking logic
      if (window.gtag) {
        window.gtag('event', 'change', {
          event_category: 'Textarea',
          event_label: gaAction, // The label representing the action
          value: value, // Track the value entered in the textarea
        });
      }
    }
    // Trigger the original onChange handler passed via props
    onChange?.(e);
  };

  return (
    <div>
      {label && <label className="block mb-2">{label}</label>} {/* Render label if provided */}
      <textarea
        placeholder={placeholder}
        onChange={handleChange} // Attach the change handler for tracking
        {...props}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );
};

export default Textarea;
