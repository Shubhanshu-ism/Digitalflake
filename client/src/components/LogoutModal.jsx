import { AlertTriangle } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
                <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center text-red-600">
                        <AlertTriangle size={32} />
                        <span className="ml-2 text-xl font-bold text-black">Log Out</span>
                    </div>
                </div>
                <p className="text-gray-500 mb-8">Are you sure you want to log out?</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-8 py-2 bg-[#5C218B] text-white rounded-full hover:bg-[#4a1a70]"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
