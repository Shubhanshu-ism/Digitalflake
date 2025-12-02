import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

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
  label,
  rightElement,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const baseStyles = 'h-[60px] w-full border rounded-md bg-white transition-colors duration-200 ease-out focus:outline-none text-lg text-neutral-900 placeholder-transparent peer';

  const stateStyles = {
    default: 'border-neutral-400 focus:border-primary',
    error: 'border-error',
    disabled: 'bg-neutral-50 opacity-70 cursor-not-allowed',
  };

  const hasIcon = Icon ? 'pl-11' : 'px-4';

  return (
    <div className="relative w-full">
      {/* Input Field */}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Icon className="h-5 w-5 text-neutral-300" />
          </div>
        )}

        <input
          type={inputType}
          placeholder={label || placeholder} // Placeholder required for peer-placeholder-shown trick
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

        {/* Floating Label (On Border) */}
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              "absolute left-3 -top-3 bg-white px-1 text-sm text-neutral-500 transition-all duration-200",
              "peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-neutral-400",
              "peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary"
            )}
          >
            {label}
          </label>
        )}

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-neutral-700 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Right Element (e.g., Forgot Password link outside input) */}
      {rightElement && (
        <div className="absolute right-0 -bottom-7">
          {rightElement}
        </div>
      )}
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
  label: PropTypes.string,
  rightElement: PropTypes.node,
};

export default Input;
