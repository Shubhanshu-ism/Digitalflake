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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        
        {/* Header: Icon and Title centered */}
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="text-error" size={40} strokeWidth={2.5} />
          <h2 className="text-2xl font-bold text-neutral-900 mt-1">
            {title}
          </h2>
        </div>
        
        {/* Message */}
        <p className="text-base text-neutral-500 text-center mb-8">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex w-full gap-4">
          <Button 
            variant="secondary" 
            onClick={onClose} 
            className="w-full border-neutral-300 text-neutral-500"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={onConfirm} 
            className="w-full"
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