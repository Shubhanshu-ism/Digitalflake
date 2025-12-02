import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  id,
  required = false,
  disabled = false,
  error = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'h-input w-full border rounded-sm bg-neutral-0 transition-colors duration-fast ease-out focus:outline-none';

  const stateStyles = {
    default: 'border-neutral-100 focus:border-primary focus:shadow-focus',
    error: 'border-error shadow-error',
    disabled: 'bg-neutral-50 opacity-70 cursor-not-allowed',
  };

  const hasIcon = Icon ? 'pl-11' : 'px-4';

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <Icon className="h-5 w-5 text-neutral-300" />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        required={required}
        disabled={disabled}
        className={clsx(
          baseStyles,
          error ? stateStyles.error : stateStyles.default,
          disabled && stateStyles.disabled,
          hasIcon,
          className,
        )}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  icon: PropTypes.elementType,
};

export default Input;
