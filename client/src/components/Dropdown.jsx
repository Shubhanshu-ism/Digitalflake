import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ChevronDown, Check } from 'lucide-react';

const Dropdown = ({
  options = [],
  selected,
  onChange,
  placeholder = 'Select an option',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === selected)?.label || placeholder;

  return (
    <div className={clsx('relative', className)} ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        className="h-input w-full px-4 py-2 bg-neutral-white border border-neutral-light rounded-standard flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-body text-neutral-darkest">{selectedLabel}</span>
        <ChevronDown
          className={clsx(
            'h-5 w-5 text-neutral-dark transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {/* Options */}
      {isOpen && (
        <div
          className="absolute top-full mt-1 w-full max-h-60 overflow-y-auto bg-neutral-white border border-neutral-light rounded-standard shadow-lg z-10 animate-dropdown-slide"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={clsx(
                'h-10 px-4 flex items-center justify-between text-body cursor-pointer bg-white hover:bg-neutral-100',
                option.value === selected && 'bg-neutral-200 font-medium'
              )}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={option.value === selected}
            >
              <span>{option.label}</span>
              {option.value === selected && <Check className="h-5 w-5 text-primary" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Dropdown;
