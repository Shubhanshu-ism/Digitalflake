import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'h-input px-lg text-body font-semibold transition-all duration-150 ease-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50';

  const variants = {
    primary: 'bg-primary text-white rounded-pill shadow-md hover:brightness-90 hover:scale-[1.02] active:brightness-[0.85]',
    secondary: 'bg-neutral-white border border-neutral-light text-neutral-dark rounded-pill hover:brightness-95 hover:scale-[1.02] active:brightness-[0.9]',
    ghost: 'bg-transparent text-neutral-dark rounded-standard hover:bg-gray-100',
  };

  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        disabledStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
