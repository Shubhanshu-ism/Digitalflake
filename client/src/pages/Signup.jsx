import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import loginBg from '../assets/login_bg.png';
import Button from '../components/Button';
import Input from '../components/Input';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError('Error creating account. Please try again.');
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-[#5C218B]/20 overflow-hidden">
            {/* Background Image/Illustration */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                    className="w-full h-full object-cover opacity-50 lg:opacity-100 lg:object-contain lg:scale-90"
                    src={loginBg}
                    alt="Background"
                />
                {/* Overlay to ensure text readability if needed */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply lg:hidden"></div>
            </div>

            {/* Signup Card */}
            <div className="relative z-10 w-full max-w-[480px] bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-4">
                <div className="flex flex-col items-center mb-8">
                    {/* Logo */}
                    <div className="flex items-center mb-6">
                        <div className="h-10 w-10 bg-primary rounded-standard flex items-center justify-center text-white font-bold text-xl mr-3 shadow-sm">
                            D
                        </div>
                        <span className="text-2xl font-bold text-primary tracking-tight">digitalflake</span>
                    </div>

                    {/* Header Text */}
                    <h2 className="text-2xl font-normal text-neutral-700 text-center">
                        Create your account
                    </h2>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={!!error}
                        />

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label="Email-id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                        />

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!error}
                        />
                    </div>

                    {error && (
                        <div className="text-error text-sm text-center font-medium bg-error/10 py-2 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button type="submit" variant="primary" className="w-full py-3 text-lg shadow-lg bg-primary hover:bg-primary-dark">
                        Sign up
                    </Button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-neutral-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                                Log In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;