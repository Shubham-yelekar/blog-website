import React from "react";
import { Link } from "react-router";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  linkTo?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  linkTo,
  type = "button",
  className = "primary-btn",
  ...props
}) => {
  if (linkTo) {
    return (
      <button type={type} className={`${className}`} {...props}>
        <Link to={linkTo}>{children}</Link>
      </button>
    );
  }
  return (
    <button type={type} className={`${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
