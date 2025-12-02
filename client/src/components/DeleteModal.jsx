import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

const DeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Delete', 
  message = 'Are you sure you want to delete?' 
}) => {
    const newDeleteMessage ='Are you sure you want to delete?' 
  return (
    // The Modal component handles the white box, rounded corners, and default padding (p-6).
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col p-8">
        
        {/* Header Section: Icon and Title centered together */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {/* Red warning icon */}
          <AlertTriangle 
            className="text-error shrink-0" 
            size={32} 
            strokeWidth={2.5}
          />
          {/* Bold black title */}
          <h2 className="text-2xl font-bold text-neutral-900 leading-none mt-1">
            {title}
          </h2>
        </div>
        
        {/* Body Text: Centered gray text with margin below */}
        <p className="text-base text-neutral-500 text-center mb-8">
          {newDeleteMessage}
        </p>

        {/* Button Row: Two equal-width buttons with a gap */}
        <div className="flex w-full gap-4">
          {/* "Cancel" Button (Left): White background, gray border, gray text, rounded-pill */}
          <Button 
            variant="secondary"
            onClick={onClose} 
            // Overriding secondary styles to match the specific outline design
            className="w-full rounded-pill border border-neutral-300 bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 hover:border-neutral-400"
          >
            Cancel
          </Button>
          
          {/* "Confirm" Button (Right): Primary purple background, white text, rounded-pill */}
          <Button 
            variant="primary" 
            onClick={onConfirm} 
            className="w-full rounded-pill shadow-button-primary"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default DeleteModal;