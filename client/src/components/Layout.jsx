import { useAuth } from '../context/AuthContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold text-indigo-600">D-Set</h1>
                </div>
                <nav className="mt-4">
                    <Link
                        to="/"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                        <LayoutDashboard className="mr-3 h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                        <Settings className="mr-3 h-5 w-5" />
                        Settings
                    </Link>
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-gray-700 hover:text-red-600"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                        <div className="flex items-center">
                            <User className="mr-2 h-5 w-5 text-gray-500" />
                            <span className="text-gray-700">{user?.name}</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
