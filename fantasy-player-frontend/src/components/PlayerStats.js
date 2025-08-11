import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";

const PlayerStats = () => {
    const location = useLocation();
    const { player } = location.state || {};
    const { playerName } = useParams();
    const navigate = useNavigate();

  return (
    <div className="lg:col-span-2">
        {player ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="border-b border-gray-200 pb-6 mb-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {player.playerName}
                        </h2>
                        <button 
                        onClick={() => navigate('/')}
                        className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                        >Back</button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <FaCircleUser className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Player
                </h3>
                <p className="text-gray-600">
                    Click on a player from the search results to view their detailed statistics.
                </p>
            </div>
        )}
    </div>
  )
}

export default PlayerStats
