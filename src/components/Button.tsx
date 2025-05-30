import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({children, type= 'button', className = 'primary-btn', ...props }) => {
  return (
    <button type={type}  className={`${className}`} {...props}>
      {children}
    </button>
    )
}

export default Button