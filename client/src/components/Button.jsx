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
  const baseStyles = 'h-button px-lg text-body font-semibold transition-all duration-fast ease-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30';

  const variants = {
    // CHANGE: replaced 'rounded-pill' with 'rounded-full'
    primary: 'bg-primary text-neutral-0 rounded-full shadow-button-primary hover:brightness-90 hover:scale-[1.02] active:brightness-[0.85]',
    
    // CHANGE: replaced 'rounded-pill' with 'rounded-full'
    secondary: 'bg-neutral-0 border border-neutral-300 text-neutral-500 rounded-full hover:brightness-95 hover:scale-[1.02] active:brightness-[0.9]',
    
    ghost: 'bg-transparent text-neutral-500 rounded-sm hover:bg-neutral-100/50',
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