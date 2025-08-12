import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaCircleUser, FaEarthEurope, FaMapPin, FaFutbol, FaCalendar} from "react-icons/fa6";

const PlayerStats = () => {
    const location = useLocation();
    const { player } = location.state || {};
    const { playerName } = useParams();
    const navigate = useNavigate();

    const StatsCard = ({icon: Icon, label, value, color = "blue"}) => (
        <div className={`bg-white rounded-lg border-l-4 border-${color}-500 p-4 shadow-sm hover:shadow-md transition-shadow duration-200`}>
            <div className="flex items-center">
                <div className={`flex-shrink-0 p-2 bg-${color}-100 rounded-lg`}>
                    <Icon className={`w-5 h-5 text-${color}-600`} />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-xl font-semibold text-gray-900">
                        {value !== null && value !== undefined ? (
                        typeof value === 'number' ? value.toFixed(1) : value
                        ) : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )

  return (
    <div className="lg:col-span-2">
        {player ? (
            <div className="bg-white rounded-xl shadow-lg p-6">

                {/*Player Header*/}
                <div className="border-b border-gray-200 pb-6 mb-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {player.playerName}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <span className="flex items-center">
                                <FaCircleUser className="w-5 h-5 mr-2" />
                                Positions: {player.position}
                            </span>
                            <span className='flex items-center'>
                                <FaEarthEurope className="w-5 h-5 mr-2" />
                                Nation: {player.nation}
                            </span>
                            <span className='flex items-center'>
                                <FaMapPin className="w-5 h-5 mr-2" />
                                Team: {player.team_name}
                            </span>
                          <span className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                            <FaCalendar className="w-5 h-5 mr-2" />
                            {parseInt(player.age)?.toFixed(1)} years old
                          </span>
                          {player.nation && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {player.nation}
                            </span>
                          )}
                            
                        </div>
                        <button 
                        onClick={() => navigate('/')}
                        className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                        >Back</button>
                    </div>
                    <p>{player.team_name}</p>
                    <p>{player.nation}</p>
                    <p>{player.position}</p>
                    <p>{player.goals} Goals</p>
                    <p>{player.assists} Assists</p>
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
