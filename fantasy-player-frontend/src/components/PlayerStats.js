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
                    <div className="flex items-start justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {player.playerName}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <span className="flex items-center px-3 py-1 bg-green-100 text-grene-800 rounded-full text-sm font-mediu">
                                <FaCircleUser className="w-5 h-5 mr-2" />
                                Positions: {player.position}
                            </span>
                            <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                <FaEarthEurope className="w-5 h-5 mr-2" />
                                {player.nation}
                            </span>
                            <span className='flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-mediu'>
                                <FaMapPin className="w-5 h-5 mr-2" />
                                Team: {player.team_name}
                            </span>
                          <span className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            <FaCalendar className="w-5 h-5 mr-2" />
                            {parseInt(player.age)} years old
                          </span>
                         {/*<span className="flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            <FaFutbol className="w-5 h-5 mr-2" />
                            {player.goals_assists} Goals + Assists
                          </span>*/}
                            
                        </div>
                        <button 
                        onClick={() => navigate('/')}
                        className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                        >Back</button>
                    </div>
                    

                    <div className="mb-10">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <StatsCard
                            icon = {FaFutbol}
                            label = "Matches Played"
                            value = {player.matches_played}
                            color = 'green'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Matches Started"
                            value = {player.matches_started}
                            color = 'green'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Minutes Played"
                            value = {player.minutes_played}
                            color = 'green'/>
                        
                        </div>
                    </div>
                        
                    <div className="mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatsCard
                            icon = {FaFutbol}
                            label= "Goals"
                            value = {player.goals}
                            color = 'blue'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label= "Assists"
                            value = {player.assists}
                            color = 'blue'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Goals + Assists"
                            value = {player.goals_assists}
                            color = 'blue'/>
                            


                        </div>
                    </div>

                    <div className='mb-12'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            <StatsCard
                            icon = {FaFutbol}
                            label = "Yellow Cards"
                            value = {player.yellow_cards}
                            color = 'yellow'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Red Cards"
                            value = {player.red_cards}
                            color = 'red'/>
                        </div>
                    </div>

                    <div className='mb-10'>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Performance Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Expected Goals (xG)"
                            value = {player.expected_goals}
                            color = 'green'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Expected Assists (xA)"
                            value = {player.expected_assists}
                            color = 'green'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Expected G+A (xGA)"
                            value = {player.expected_g_and_a}
                            color = 'green'/>
                        </div>
                    </div>

                    <div className='mb-12'>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics per 90 mins</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Goals per Game"
                            value = {player.goals_per_game}
                            color = 'blue'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label = "Assists per Game"
                            value = {player.assists_per_game}
                            color = 'blue'/>

                            <StatsCard
                            icon = {FaFutbol}
                            label = "G+A per Game"
                            value = {player.g_and_a_per_game}
                            color = 'blue'/>

                        </div>

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
