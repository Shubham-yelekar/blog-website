import React, { useId, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Input(
  { label, options, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        id={id}
        {...props}
        ref={ref}
        className={`px-3 py-2 capitalize rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
