import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, className = '' }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 150); // Corresponds to modal-exit animation duration
  };

  if (!isOpen && !isAnimatingOut) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex justify-center items-center p-4 bg-overlay-bg p-4"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={clsx(
          'relative bg-neutral-0 rounded-lg shadow-xl overflow-hidden ',
          
          { 'animate-modal-enter': isOpen && !isAnimatingOut },
          { 'animate-modal-exit': isAnimatingOut },
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-medium hover:text-neutral-dark"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Modal;
