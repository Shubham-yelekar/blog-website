import React, { useId, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  type: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-0 focus:outline-1 focus:outline-gray-500 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
