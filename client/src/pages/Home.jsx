import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                    <div className="h-16 w-16 bg-[#5C218B] rounded flex items-center justify-center text-white font-bold text-3xl mr-3">D</div>
                    <span className="text-4xl font-bold text-[#5C218B]">digitalflake</span>
                </div>
                <h1 className="text-2xl font-normal text-gray-600 mt-4">Welcome to Digitalflake admin</h1>
            </div>
        </div>
    );
};

export default Home;
