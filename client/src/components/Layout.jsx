import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Layers, Box, Package, LogOut, User } from 'lucide-react';
import clsx from 'clsx';
import LogoutModal from './LogoutModal';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const handleLogoutConfirm = () => {
        logout();
        navigate('/login');
        setIsLogoutModalOpen(false);
    };

    const handleLogoutCancel = () => {
        setIsLogoutModalOpen(false);
    };

    const navItems = [
        { name: 'Home', path: '/', icon: LayoutDashboard },
        { name: 'Category', path: '/category', icon: Layers },
        { name: 'Subcategory', path: '/subcategory', icon: Box },
        { name: 'Products', path: '/products', icon: Package },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 flex items-center justify-center border-b">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-[#5C218B] rounded flex items-center justify-center text-white font-bold text-lg mr-2">D</div>
                        <span className="text-xl font-bold text-[#5C218B]">digitalflake</span>
                    </div>
                </div>
                <nav className="mt-6 flex-1 px-2 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={clsx(
                                    'group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                                    isActive
                                        ? 'bg-[#F4F1F8] text-[#5C218B] border-r-4 border-[#5C218B]'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        'mr-3 h-5 w-5 flex-shrink-0',
                                        isActive ? 'text-[#5C218B]' : 'text-gray-400 group-hover:text-gray-500'
                                    )}
                                />
                                {item.name}
                                {isActive && <span className="ml-auto text-[#5C218B]">▶</span>}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={handleLogoutClick}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-[#5C218B] shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white"></h2> {/* Empty title as per design usually, or breadcrumb */}
                        <div className="flex items-center">
                            <div className="bg-white rounded-full p-1">
                                <User className="h-6 w-6 text-[#5C218B]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        </div>
    );
};

export default Layout;
