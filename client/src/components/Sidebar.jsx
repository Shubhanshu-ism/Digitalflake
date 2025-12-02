import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, List, Package, X } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Category', path: '/category', icon: LayoutGrid },
        { name: 'Subcategory', path: '/subcategory', icon: List },
        { name: 'Products', path: '/products', icon: Package },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[150] lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed top-0 left-0 h-full bg-neutral-50 border-r border-neutral-100 transition-transform duration-300 ease-in-out z-[200] lg:z-[90]",
                    "w-[280px] lg:w-sidebar", // Mobile width 280px, Desktop standard
                    "mt-0 lg:mt-header", // Mobile: top-0, Desktop: below header
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Mobile Header with Close Button */}
                <div className="flex items-center justify-between p-4 lg:hidden border-b border-neutral-100">
                    <span className="text-lg font-bold text-primary">digitalflake</span>
                    <button onClick={onClose} className="p-1">
                        <X className="h-6 w-6 text-neutral-500" />
                    </button>
                </div>

                <nav className="flex flex-col space-y-1 py-sm">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path) && (item.path !== '/' || location.pathname === '/');

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => onClose && onClose()} // Close on navigation (mobile)
                                className={clsx(
                                    'group flex items-center h-12 px-5 gap-3 transition-colors border-l-3',
                                    isActive
                                        ? 'bg-accent border-primary font-semibold text-neutral-900'
                                        : 'border-transparent text-neutral-700 font-normal hover:bg-neutral-100'
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        'h-5 w-5 flex-shrink-0',
                                        isActive ? 'text-primary' : 'text-neutral-500'
                                    )}
                                />
                                <span className="text-body">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
