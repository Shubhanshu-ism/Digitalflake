import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, List, Package } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Category', path: '/category', icon: LayoutGrid },
        { name: 'Subcategory', path: '/subcategory', icon: List },
        { name: 'Products', path: '/products', icon: Package },
    ];

    return (
        <aside className="fixed top-0 left-0 w-sidebar h-full bg-neutral-50 border-r border-neutral-100 mt-header py-sm z-[90]">
            <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path) && (item.path !== '/' || location.pathname === '/');

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
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
    );
};

export default Sidebar;
