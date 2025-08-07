import React from 'react'
import { useState } from 'react';
import { FaSearchengin } from "react-icons/fa6";

const PlayerSearchBar = () => {
    const [searchQuery, setSearchQuery] = useState(''); {/* State to hold the search query */ }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Fantasy Premier League Player Finder
                </h1>
                <p className='text-gray-600 text-lg'>
                    Search and explore players from the Fantasy Premier League database (2024/2025 stats).
                </p>
            </div>

            {/* Search Bar */}
            <div className='relative mb-8'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearchengin className="h-5 w-5 text-gray-400" />
                </div>
                <div className='flex items-center space-x-2'>
                    <input
                    className="block w-full pl-10 pr-3 py-4 text-lg border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
                    type="text"
                    value = {searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter player name (e.g., 'Mohamed Salah' or 'Erling Haaland')"
                    />

                                <button
                    onClick={(e) => {setSearchQuery(e.target.value);
                        console.log(searchQuery);
                    }}
                    className="px-6 py-4 text-lg font-semibold bg-blue-500 text-white rounded-r-xl hover:bg-blue-600 transition-all duration-200"
                >
                    Search
                </button>
            </div>

            </div>

        </div>
    </div>
  )
}

export default PlayerSearchBar
