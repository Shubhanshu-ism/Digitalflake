import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import loginBg from '../assets/login_bg.png';
import Button from '../components/Button';
import Input from '../components/Input';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
        setError('Please enter both email and password.');
        return;
    }
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel (Form) */}
      <div className="flex flex-col items-center justify-center bg-neutral-0 px-4 py-12">
        <div className="w-full max-w-sm space-y-md">
          {/* Logo */}
          <div className="flex justify-center mb-md">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">D</div>
              <span className="text-heading font-bold text-primary">digitalflake</span>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-center text-title text-neutral-700">
            Welcome to Digitalflake admin
          </h2>

          <form className="space-y-md" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email-id"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
            />

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
            />

            <div className="flex items-center justify-end text-sm -mt-sm mb-md">
                <button type="button" onClick={() => setIsModalOpen(true)} className="font-medium text-primary hover:text-primary/80">
                    Forgot Password?
                </button>
            </div>

            {error && (
              <div className="text-error text-caption text-center -mt-sm">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full">
              Log In
            </Button>
            
            <div className="text-center !mt-md">
              <p className="text-body text-neutral-500">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-primary hover:text-primary/80">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel (Illustration) */}
      <div className="hidden lg:flex items-center justify-center relative bg-gradient-to-br from-[#F0E6F6] to-[#E8D5F0]">
        <img
          className="max-w-lg w-auto object-contain"
          src={loginBg}
          alt="Login Illustration"
        />
      </div>
    </div>
    <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Login;