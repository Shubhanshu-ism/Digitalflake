
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import loginBg from '../assets/login_bg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white w-full lg:w-1/2 max-w-2xl z-10 shadow-xl">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
             {/* Logo Placeholder */}
            <div className="flex items-center justify-center lg:justify-start mb-8">
               <div className="h-10 w-10 bg-[#5C218B] rounded flex items-center justify-center text-white font-bold text-xl mr-2">D</div>
               <span className="text-2xl font-bold text-[#5C218B]">digitalflake</span>
            </div>
            <h2 className="mt-6 text-2xl font-normal text-gray-500">
              Welcome to Digitalflake admin
            </h2>
          </div>

          <div className="mt-8">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email-id
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#5C218B] focus:border-[#5C218B] sm:text-sm"
                    placeholder="Email-id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#5C218B] focus:border-[#5C218B] sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#5C218B] hover:text-[#4a1a70]">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5C218B] hover:bg-[#4a1a70] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C218B]"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:block relative w-0 flex-1 bg-[#F5F5F5]">
        <div className="absolute inset-0 flex items-center justify-center">
            <img
              className="h-3/4 w-auto object-contain"
              src={loginBg}
              alt="Login Illustration"
            />
        </div>
      </div>
    </div>
  );
};

export default Login;

