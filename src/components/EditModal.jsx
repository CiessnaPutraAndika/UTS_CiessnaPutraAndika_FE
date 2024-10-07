import React from 'react';

export const Modals = ({ isBuka, onTutup, judul, children, onSimpan }) => {
    if (!isBuka) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-blue-600">{judul}</h2>
                    <button 
                        className="text-gray-600 hover:text-gray-900"
                        onClick={onTutup}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
                <div className="flex justify-end p-4 border-t gap-x-4">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={onTutup}
                    >
                        Close
                    </button>
                    <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={onSimpan}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
