import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ChevronDown, Check } from 'lucide-react';

const MultiSelectDropdown = ({
  options = [],
  selected = [],
  onChange,
  placeholder = 'Select options',
  className = '',
  dependsOn = null, // Value of a dependency, e.g., categoryId
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

  useEffect(() => {
    // If the dependency changes, clear selected options
    if (dependsOn !== null && selected.length > 0) {
      onChange([]);
    }
  }, [dependsOn]);


  const handleSelect = (option) => {
    const newSelected = selected.includes(option.value)
      ? selected.filter((item) => item !== option.value)
      : [...selected, option.value];
    onChange(newSelected);
  };

  const selectedLabels = options
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const displayValue =
    selectedLabels.length > 0
      ? selectedLabels.join(', ')
      : placeholder;

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
        <span className="text-body text-neutral-darkest overflow-hidden whitespace-nowrap text-ellipsis mr-2">
          {selectedLabels.length > 0 ? `${selectedLabels.length} selected` : placeholder}
        </span>
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
          {options.length === 0 ? (
            <div className="p-4 text-body text-neutral-dark">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={clsx(
                    'h-10 px-4 flex items-center text-body cursor-pointer hover:bg-neutral-100',
                    isSelected && 'bg-neutral-200' // selected background
                  )}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="mr-3 h-4 w-4 text-primary focus:ring-primary rounded"
                  />
                  <span>{option.label}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

MultiSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  dependsOn: PropTypes.any,
};

export default MultiSelectDropdown;
