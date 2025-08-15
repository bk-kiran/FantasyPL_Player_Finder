import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaX, FaCircleUser, FaEarthEurope, FaMapPin, FaFutbol, FaCalendar, FaCalendarCheck, FaCircleExclamation, FaClock, FaRankingStar, FaArrowLeft, FaBullseye} from "react-icons/fa6";
import { getFullPositionName } from '../utils/playerUtils';

const PlayerStats = () => {
    const location = useLocation();
    const { playerName } = useParams();
    const navigate = useNavigate();

    const [player, setPlayer] = useState(location.state?.player || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE = 'http://localhost:8080/api/v1/player';

    useEffect(() => { // if no player fetched from state, fetch player details from API
        if (!player && playerName) {
            fetchPlayerData(playerName);
        }
    }, [player, playerName])

    const fetchPlayerData = async (urlPlayerName) => {
        try {
            setLoading(true);
            setError(null);
            
            // Convert URL format back to searchable format
            const searchName = urlPlayerName.replace(/([a-z])([A-Z])/g, '$1 $2');
            
            const response = await fetch(`${API_BASE}?playerName=${encodeURIComponent(searchName)}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch player data');
            }
            
            const data = await response.json();
            
            if (data.length > 0) {
                // Find exact match or take first result
                const exactMatch = data.find(p => 
                    p.playerName.replace(/\s+/g, '').toLowerCase() === urlPlayerName.toLowerCase()
                );
                setPlayer(exactMatch || data[0]);
            } else {
                setError(`No player found with name: ${searchName}`);
            }
        } catch (err) {
            setError('Failed to load player data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading player data...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="text-center">
                    <FaX className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Player Not Found
                    </h3>
                    <p className="text-red-600 mb-4">
                        {error}
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        )
    }


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
                    <div className="flex items-start justify-between mb-2">
                        <button 
                            onClick={() => {navigate(-1)}}
                            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                            >
                            <FaArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </button>
                    </div>

                    <div className="flex items-start justify-between mb-4">
                         <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {player.playerName}
                        </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-12">
                        <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-mediu">
                            <FaCircleUser className="w-5 h-5 mr-2" />
                            Positions: {getFullPositionName(player.position)}
                        </span>
                        <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium">
                            <FaEarthEurope className="w-5 h-5 mr-2" />
                            {player.nation}
                        </span>
                        <span className='flex items-center px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-mediu'>
                            <FaMapPin className="w-5 h-5 mr-2 " />
                            Team: {player.team_name}
                        </span>
                        <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium">
                            <FaCalendar className="w-4 h-4 mr-1" />
                            {player.league_last_season} 24/25
                        </span>
                        <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium">
                            <FaClock className="w-5 h-5 mr-2" />
                            {parseInt(player.age)} years old
                        </span>
                    </div>
                    

                    <div className="mb-10">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <StatsCard
                            icon = {FaCalendar}
                            label = "Matches Played"
                            value = {player.matches_played}
                            color = 'green'/>

                            <StatsCard
                            icon = {FaCalendarCheck}
                            label = "Matches Started"
                            value = {player.matches_started}
                            color = 'green'/>

                            <StatsCard
                            icon = {FaClock}
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
                            icon = {FaBullseye}
                            label= "Assists"
                            value = {player.assists}
                            color = 'blue'/>

                            <StatsCard
                            icon = {FaRankingStar}
                            label = "Goals + Assists"
                            value = {player.goals_assists}
                            color = 'blue'/>
                            


                        </div>
                    </div>

                    <div className='mb-12'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            <StatsCard
                            icon = {FaCircleExclamation}
                            label = "Yellow Cards"
                            value = {player.yellow_cards}
                            color = 'yellow'/>

                            <StatsCard
                            icon = {FaCircleExclamation}
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
                            icon = {FaBullseye}
                            label = "Expected Assists (xA)"
                            value = {player.expected_assists}
                            color = 'green'/>

                            <StatsCard
                            icon = {FaRankingStar}
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
                            label = "Goals per 90 mins"
                            value = {player.goals_per_game}
                            color = 'blue'/>

                            <StatsCard
                            icon = {FaBullseye}
                            label = "Assists per 90 mins"
                            value = {player.assists_per_game}
                            color = 'blue'/>

                            <StatsCard
                            icon = {FaRankingStar}
                            label = "G+A per 90 mins"
                            value = {player.g_and_a_per_game}
                            color = 'blue'/>

                        </div>

                    </div>

                    <div className='mb-12'>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Performance Metrics per 90 mins</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <StatsCard
                            icon={FaFutbol}
                            label="xG per 90 mins"
                            value = {player.expected_goals_per_game}
                            color = 'red'/>

                            <StatsCard
                            icon={FaBullseye}
                            label="xA per 90 mins"
                            value = {player.expected_assists_per_game}
                            color = 'red'/>
                        </div>
                    </div>



                </div>
            </div>
        ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <FaCircleUser className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Loading Player Stats...
                </h3>
            </div>
        )}
    </div>
  )
}

export default PlayerStats
