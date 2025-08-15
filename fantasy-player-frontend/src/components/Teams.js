import React from 'react'
import { useState, useEffect } from 'react';
import { FaEarthEurope, FaCalendar, FaFutbol, FaMapPin, FaCircleUser, FaTriangleExclamation, FaArrowLeft, FaUsers } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { getFullPositionName } from '../utils/playerUtils';
import Navbar from './Navbar';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  const API_BASE = 'http://localhost:8080/api/v1/player';

  // Premier League teams with their logos
  const premierLeagueTeams = [
    { name: 'Arsenal', logo: '/images/teams/arsenal.svg', id: 'Arsenal' },
    { name: 'Aston Villa', logo: '/images/teams/aston-villa.webp', id: 'Aston-Villa' },
    { name: 'Bournemouth', logo: '/images/teams/bournemouth.svg', id: 'Bournemouth' },
    { name: 'Brentford', logo: '/images/teams/brentford.webp', id: 'Brentford' },
    { name: 'Brighton', logo: '/images/teams/brighton.svg', id: 'Brighton' },
    { name: 'Burnley', logo: '/images/teams/burnley.png', id: 'Burnley' },
    { name: 'Chelsea', logo: '/images/teams/chelsea.svg', id: 'Chelsea' },
    { name: 'Crystal Palace', logo: '/images/teams/crystal-palace.svg', id: 'Crystal-Palace' },
    { name: 'Everton', logo: '/images/teams/everton.svg', id: 'Everton' },
    { name: 'Fulham', logo: '/images/teams/fulham.svg', id: 'Fulham' },
    { name: 'Leeds United', logo: '/images/teams/leeds-united.svg', id: 'Leeds-United' },
    { name: 'Liverpool', logo: '/images/teams/liverpool.svg', id: 'Liverpool' },
    { name: 'Manchester City', logo: '/images/teams/man-city.svg', id: 'Manchester-City' },
    { name: 'ManchesterUnited', logo: '/images/teams/man-united.svg', id: 'Manchester-United' },
    { name: 'Newcastle United', logo: '/images/teams/newcastle.svg', id: 'Newcastle-United' },
    { name: 'Nottingham Forest', logo: '/images/teams/nottingham.webp', id: 'Nottingham-Forest' },
    { name: 'Sunderland', logo: '/images/teams/sunderland.png', id: 'Sunderland' },
    { name: 'Tottenham', logo: '/images/teams/spurs.svg', id: 'Tottenham' },
    { name: 'West Ham', logo: '/images/teams/west-ham.svg', id: 'West-Ham-United' },
    { name: 'Wolves', logo: '/images/teams/wolves.svg', id: 'Wolves' },
  ];

  useEffect(() => {
    setTeams(premierLeagueTeams);
  }, []);

  const fetchTeamPlayers = async (teamName, teamId) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`${API_BASE}?teamName=${encodeURIComponent(teamId)}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch tean data');
            }
            
            const data = await response.json();
            const sortedData = data.sort((a, b) => {
                return b.matches_played - a.matches_played;
            })
            setTeamPlayers(sortedData);
            setSelectedTeam(teamName);
        } catch (err) {
            setError('Failed to load team data. Please try again.');
            setTeamPlayers([]);
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

    if (selectedTeam) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-6">
                    <button 
                    onClick={() => {setSelectedTeam(null); setTeamPlayers([]);}}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                    >
                    <FaArrowLeft className="w-4 h-4 mr-2" />
                    Back to Teams
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedTeam} Squad
                    </h1>
                    <p className="text-gray-600">
                    All players from {selectedTeam} in the Fantasy Premier League database.
                    </p>
                </div>

                {loading && (
                    <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading team players...</p>
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

                {teamPlayers.length > 0 && (
                    <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Players ({teamPlayers.length})
                    </h2>
                    <div className="space-y-3">
                        {teamPlayers.map((player, index) => (
                        <PlayerCard
                            key={`${player.playerName}-${player.team_name}-${index}`}
                            player={player}
                            onClick={handlePlayerSelect}
                        />
                        ))}
                    </div>
                    </div>
                )}

                {!loading && teamPlayers.length === 0 && !error && (
                    <div className="text-center py-16">
                    <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No players found for this team.</p>
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
                    Premier League Teams
                </h1>
                <p className="text-gray-600 text-lg">
                    Browse 24/25 player stars by their Premier League teams.
                </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {teams.map((team, index) => (
                    <div
                    key={index}
                    //onClick={}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105 p-6"
                    >
                    <div className="text-center" onClick={() => fetchTeamPlayers(team.name, team.id)}>
                        <div className="mx-auto mb-4 flex items-center justify-center">
                        <img 
                            src={team.logo} 
                            alt={`${team.name} logo`}
                            className="w-16 h-16 object-contain"
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
  );
};
export default Teams
