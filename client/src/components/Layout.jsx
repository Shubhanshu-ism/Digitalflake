import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { User, Menu } from 'lucide-react';
import LogoutModal from './LogoutModal';
import Sidebar from './Sidebar';

const Layout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full h-[56px] lg:h-header bg-primary shadow-md z-[100] flex items-center justify-between px-md">
                <div className="flex items-center">
                    {/* Mobile Menu Button */}
                    <button
                        className="mr-4 lg:hidden text-white"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="h-[28px] w-[28px] lg:h-8 lg:w-8 bg-white/50 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">D</div>
                    <span className="text-base font-semibold text-white hidden lg:block">digitalflake</span>
                </div>
                <div className="flex items-center cursor-pointer" onClick={handleLogoutClick}>
                    <div className="bg-white/50 rounded-full p-1">
                        <User className="h-6 w-6 text-white" />
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content */}
            <div className="lg:ml-sidebar mt-header min-h-content transition-all duration-300">
                {/* Page Content */}
                <main className="p-md lg:p-lg">
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
