import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import api from '../api/axios';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRequest = async () => {
        setError('');
        setMessage('');
        try {
            await api.post('/auth/forgot-password', { email });
            setMessage('If an account with that email exists, a password reset link has been sent.');
            setEmail('');
        } catch (err) {
            setError('Failed to send reset link. Please try again later.');
        }
    };

    const handleClose = () => {
        setEmail('');
        setMessage('');
        setError('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} className="w-[520px] h-auto">
            <div className="p-lg text-center">
                <h2 className="text-[22px] font-semibold text-primary mb-xs">
                    Did you forget your password?
                </h2>
                <p className="text-sm text-neutral-500 mb-md leading-relaxed">
                    Enter your email address and we'll send you a link to restore password
                </p>
                
                <div className="space-y-md">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {message && <p className="text-success text-sm">{message}</p>}
                    {error && <p className="text-error text-sm">{error}</p>}
                    
                    <Button variant="primary" onClick={handleRequest} className="w-full">
                        Request reset link
                    </Button>
                </div>

                <div className="mt-sm">
                    <button onClick={handleClose} className="text-xs text-neutral-500 hover:underline">
                        Back to log in
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;
