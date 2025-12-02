import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

const DeleteModal = ({ isOpen, onClose, onConfirm, title = 'Delete', message = 'Are you sure you want to delete?' }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-[400px] h-auto">
            <div className="p-lg flex flex-col items-center justify-center h-full text-center">
                <div className="mb-sm">
                    <AlertTriangle className="text-error" size={48} />
                </div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-xs">
                    {title}
                </h2>
                <p className="text-base text-neutral-500 mb-lg max-w-xs">
                    {message}
                </p>
                <div className="flex justify-center gap-sm">
                    <Button variant="secondary" onClick={onClose} className="min-w-[120px]">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onConfirm} className="min-w-[120px] bg-error hover:bg-error/90">
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
