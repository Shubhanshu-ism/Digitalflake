import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, List, Box } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Category', path: '/category', icon: Grid },
        { name: 'Subcategory', path: '/subcategory', icon: List },
        { name: 'Products', path: '/products', icon: Box },
    ];

    return (
        <aside className="fixed top-0 left-0 w-sidebar h-full bg-neutral-lighter border-r border-neutral-light mt-header py-sm z-[90]">
            <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                    // Also consider child routes for active state, e.g., /category/add
                    const isActive = location.pathname.startsWith(item.path) && (item.path !== '/' || location.pathname === '/');

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={clsx(
                                'group flex items-center h-12 px-5 gap-3 transition-colors border-l-4',
                                isActive
                                    ? 'bg-accent border-primary font-semibold text-neutral-darkest'
                                    : 'border-transparent text-neutral-darkest font-normal hover:bg-gray-200'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    'h-5 w-5 flex-shrink-0',
                                    isActive ? 'text-primary' : 'text-neutral-dark'
                                )}
                            />
                            <span className="text-body">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
