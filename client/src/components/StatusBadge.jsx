import React from 'react';
import clsx from 'clsx';

const StatusBadge = ({ status }) => {
    const isActive = status === 'Active';
    return (
        <span
            className={clsx(
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                isActive ? 'text-green-800' : 'text-red-800'
            )}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
