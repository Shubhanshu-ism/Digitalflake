import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] text-center">
            <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-4xl mb-md">
                D
            </div>
            <h1 className="text-lg text-neutral-500">
                Welcome to Digitalflake admin
            </h1>
        </div>
    );
};

export default Dashboard;