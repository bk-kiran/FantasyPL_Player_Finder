import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { getFullPositionName } from '../utils/playerUtils';
import { FaEarthEurope, FaFutbol, FaMapPin, FaCircleUser, FaTriangleExclamation, FaArrowLeft, FaUsers, FaCalendar } from "react-icons/fa6";

const Positions = () => {
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [positionPlayers, setPositionPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_BASE = 'http://localhost:8080/api/v1/player';

    const playerPositions = [
        { name: 'Goalkeeper', logo: '/images/positions/goalkeeper.jpeg', id: 'GK' },
        { name: 'Defender', logo: '/images/positions/defender.jpeg', id: 'DF' },
        { name: 'Wingback', logo: '/images/positions/wingback.jpeg', id: 'FW,DF' },
        { name: 'Midfielder', logo: '/images/positions/midfielder.jpeg', id: 'MF' },
        { name: 'Winger', logo: '/images/positions/winger.jpeg', id: 'FW,MF' },
        { name: 'Attacking Midfielder', logo: '/images/positions/attacking-mid.jpeg', id: 'MF,FW' },
        { name: 'Attacker', logo: '/images/positions/striker.jpeg', id: 'FW' }
    ]

    useEffect(() => {
        setPositions(playerPositions);
    }, []);

    const fetchPositionPlayers = async (positiontype, posID) => {
        try {
            setLoading(true);
            setError(null);

            console.log('Selected posID:', posID);

            // Map ALL possible position values that should appear in each category
            const positionMap = {
                'GK': ['GK'],                                // Goalkeeper
                'DF': ['DF', 'MF,DF', 'DF,MF'],            // Defender + players who also play MF
                'FW,DF': ['FW,DF','DF,FW'],               // Wingback
                'MF': ['MF', 'MF,DF', 'DF,MF'],            // Midfielder + players who also play DF (but NOT MF,FW)
                'FW': ['FW'],                               // Pure Attacker only
                'MF,FW': ['MF,FW'],               // Attacking Midfielder
                'FW,MF': ['FW,MF']               // Winger (same as attacking midfielder)
            };

            // Get the matching array from the map
            const positionsToFetch = positionMap[posID] || [posID];
            console.log('Positions to fetch:', positionsToFetch);

            // Send as pipe-separated string for backend
            const queryParam = positionsToFetch.join('|');
            console.log('Query param:', queryParam);
            
            const fullUrl = `${API_BASE}?position=${encodeURIComponent(queryParam)}`;
            console.log('Full URL:', fullUrl);

            const response = await fetch(fullUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch team data');
            }

            const data = await response.json();
            console.log('Received data:', data);
            console.log('Sample positions from data:', data.slice(0, 5).map(p => ({ name: p.name, position: p.position })));
            
            const sortedData = data.sort((a, b) => b.goals_assists - a.goals_assists);

            setPositionPlayers(sortedData);
            setSelectedPosition(positiontype);
        } catch (err) {
            console.error('Error details:', err);
            setError('Failed to load team data. Please try again.');
            setPositionPlayers([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePlayerSelect = (player) => {
        const urlPlayerName = player.playerName.replace(/\s+/g, '');
        navigate(`/playerstats/${urlPlayerName}`, { 
        state: { player: player } 
        });
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
                    {getFullPositionName(player.position)}
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
                    <FaCalendar className="w-4 h-4 mr-1" />
                    {player.league_last_season} 24/25
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

    if (selectedPosition) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-6">
                    <button 
                    onClick={() => {setSelectedPosition(null); setPositionPlayers([]);}}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                    >
                    <FaArrowLeft className="w-4 h-4 mr-2" />
                    Back to Positions
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    All {selectedPosition}s
                    </h1>
                    <p className="text-gray-600">
                    All {selectedPosition.toLowerCase()}s in the Fantasy Premier League database.
                    </p>
                </div>

                {loading && (
                    <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading {selectedPosition.toLowerCase()}s ...</p>
                    </div>
                )}

                {error && (
                    <div className="max-w-xl mx-auto mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                        <FaTriangleExclamation className="w-5 h-5 text-red-600 mr-3 flex-shrink-0"/>
                        <p className="text-red-700">{error}</p>
                    </div>
                    </div>
                )}

                {positionPlayers.length > 0 && (
                    <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Players ({positionPlayers.length})
                    </h2>
                    <div className="space-y-3">
                        {positionPlayers.map((player, index) => (
                        <PlayerCard
                            key={`${player.playerName}-${player.team_name}-${index}`}
                            player={player}
                            onClick={handlePlayerSelect}
                        />
                        ))}
                    </div>
                    </div>
                )}

                {!loading && positionPlayers.length === 0 && !error && (
                    <div className="text-center py-16">
                    <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No players found for this position.</p>
                    </div>
                )}
                </div>
            </div>
        );
    }
    
  return (
    <main>
        <Navbar/>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    All Positions
                </h1>
                <p className="text-gray-600 text-lg">
                    Browse 24/25 player stars by their positions.
                </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
                {positions.map((team, index) => (
                    <div
                    key={index}
                    //onClick={}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105 p-6"
                    >
                    <div className="text-center" onClick={() => fetchPositionPlayers(team.name, team.id)}>
                        <div className="mx-auto mb-4 flex items-center justify-center">
                        <img 
                            src={team.logo} 
                            alt={`${team.name} logo`}
                            className="w-250 h-100 object-contain"
                        />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                            {team.name}
                        </h3>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </main>
  )
}

export default Positions
