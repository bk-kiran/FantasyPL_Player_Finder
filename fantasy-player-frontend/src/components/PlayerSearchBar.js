import React from 'react'
import { useState, useEffect } from 'react';
import { FaEarthEurope, FaFutbol, FaMapPin, FaCircleUser, FaTriangleExclamation, FaSearchengin } from "react-icons/fa6";


const PlayerSearchBar = () => {
    const [searchQuery, setSearchQuery] = useState(''); {/* State to hold the search query */ }
    const [loading, setLoading] = useState(false); {/* State to indicate loading status */ }
    const [error, setError] = useState(null); {/* State to hold any error messages */ }
    const [players, setPlayers] = useState([]); {/* State to hold the list of players returned from the API */ }
    const [selectedPlayer, setSelectedPlayer] = useState(null); {/* State to hold the selected player's details */ }

  // Backend API URL 
  const API_BASE = 'http://localhost:8080/api/v1/player';

  // Debounced search function
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        searchPlayers(searchQuery.trim());
      } else {
        setPlayers([]);
        setSelectedPlayer(null);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

    // Function to search players from the backend API
  const searchPlayers = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}?playerName=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      
      const data = await response.json();
      setPlayers(data);
      
      // If only one player found, auto-select them
      if (data.length === 1) {
        setSelectedPlayer(data[0]);
      } else {
        setSelectedPlayer(null);
      }
    } catch (err) {
      setError('Error searching for players :/');
      setPlayers([]);
      setSelectedPlayer(null);
    } finally {
      setLoading(false);
    }
  };

    // Function to handle player selection from the search results
  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  const PlayerCard = ({player, isSelected, onClick}) => (
    <div
        onClick={() => onClick(player)}
        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
      }`}
    >
        <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{player.playerName}</h3>
          <div className="flex items-center mt-1 space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <FaCircleUser className="w-4 h-4 mr-1" />
              {player.position}
            </span>
            <span className="flex items-center">
              <FaEarthEurope className="w-4 h-4 mr-1" />
              {player.nation}
            </span>
            <span className="flex items-center">
              <FaMapPin className="w-4 h-4 mr-1" />
              {player.team_name}
            </span>
            <span className="flex items-center">
              <FaFutbol className="w-4 h-4 mr-1" />
              {player.matches_played} Matches Played
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">
            {player.goals_assists?.toFixed(1) || '0.0'}
          </div>
          <div className="text-xs text-gray-500">Goals + Assists</div>
        </div>
      </div>

    </div>
  )


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

                </div>

                {loading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                )}
            </div>

            {/* Error Result */}
            {error && (
                <div className="max-w-xl mx-auto mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                        <FaTriangleExclamation className="w-5 h-5 text-red-600 mr-3 flex-shrink-0"/>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            )}

            {/* Search Results */}
            {players.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Search Results ({players.length})
                    </h2>
                    <div className="space-y-3">
                        {players.map((player, index) => (
                        <PlayerCard
                            key={`${player.playerName}-${player.team_name}-${index}`} //random unique key
                            player={player}
                            isSelected={selectedPlayer?.playerName === player.playerName}
                            onClick={handlePlayerSelect}
                        />
                        ))}
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
  )}
  


export default PlayerSearchBar
