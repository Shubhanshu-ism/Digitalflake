import React from 'react';
import { Package, Layers, Box, DraftingCompass } from 'lucide-react';

const Dashboard = () => {
    // Placeholder data for dashboard cards
    const stats = [
        { name: 'Total Products', stat: '2,500', icon: Package, color: 'bg-blue-500' },
        { name: 'Total Categories', stat: '120', icon: Layers, color: 'bg-green-500' },
        { name: 'Total Subcategories', stat: '350', icon: Box, color: 'bg-yellow-500' },
        { name: 'Total Designs', stat: '1,800', icon: DraftingCompass, color: 'bg-red-500' },
    ];

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 ${item.color} rounded-md p-3`}>
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-semibold text-gray-900">
                                            {item.stat}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Quick Actions - Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-3 flex justify-between text-sm text-gray-700">
                            <span>New product "Elegant Vase" added</span>
                            <span className="text-gray-500">2 hours ago</span>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-700">
                            <span>Category "Home Decor" updated</span>
                            <span className="text-gray-500">yesterday</span>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-700">
                            <span>User "Jane Doe" signed up</span>
                            <span className="text-gray-500">3 days ago</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="px-4 py-2 bg-[#5C218B] text-white rounded-md hover:bg-[#4a1a70]">Add Product</button>
                        <button className="px-4 py-2 bg-[#5C218B] text-white rounded-md hover:bg-[#4a1a70]">Add Design</button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">View Reports</button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Manage Users</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;