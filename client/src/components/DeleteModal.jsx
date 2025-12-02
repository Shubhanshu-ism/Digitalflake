import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, title = 'Delete', message = 'Are you sure you want to delete?' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white shadow-lg">
                <div className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
                    <p className="mb-6 text-gray-500">{message}</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onClose}
                            className="rounded-full border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="rounded-full bg-[#5C218B] px-8 py-2.5 text-sm font-medium text-white hover:bg-[#4a1a70] focus:outline-none focus:ring-4 focus:ring-purple-300"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
