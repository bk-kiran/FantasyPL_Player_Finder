import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    { name: 'Arsenal', logo: '/images/teams/arsenal.svg', shortName: 'ARS' },
    { name: 'Aston Villa', logo: '/images/teams/aston-villa.webp', shortName: 'AVL' },
    { name: 'Bournemouth', logo: '/images/teams/bournemouth.svg', shortName: 'BOU' },
    { name: 'Brentford', logo: '/images/teams/brentford.webp', shortName: 'BRE' },
    { name: 'Brighton', logo: '/images/teams/brighton.svg', shortName: 'BHA' },
    { name: 'Burnley', logo: '/images/teams/burnley.png', shortName: 'BUR' },
    { name: 'Chelsea', logo: '/images/teams/chelsea.svg', shortName: 'CHE' },
    { name: 'Crystal Palace', logo: '/images/teams/crystal-palace.svg', shortName: 'CRY' },
    { name: 'Everton', logo: '/images/teams/everton.svg', shortName: 'EVE' },
    { name: 'Fulham', logo: '/images/teams/fulham.svg', shortName: 'FUL' },
    { name: 'Leeds United', logo: '/images/teams/leeds-united.svg', shortName: 'LEE' },
    { name: 'Liverpool', logo: '/images/teams/liverpool.svg', shortName: 'LIV' },
    { name: 'Manchester City', logo: '/images/teams/man-city.svg', shortName: 'MCI' },
    { name: 'Manchester United', logo: '/images/teams/man-united.svg', shortName: 'MUN' },
    { name: 'Newcastle United', logo: '/images/teams/newcastle.svg', shortName: 'NEW' },
    { name: 'Nottingham Forest', logo: '/images/teams/nottingham.webp', shortName: 'NFO' },
    { name: 'Sunderland', logo: '/images/teams/sunderland.png', shortName: 'SUN' },
    { name: 'Tottenham', logo: '/images/teams/spurs.svg', shortName: 'TOT' },
    { name: 'West Ham', logo: '/images/teams/west-ham.svg', shortName: 'WHU' },
    { name: 'Wolves', logo: '/images/teams/wolves.svg', shortName: 'WOL' },
  ];

  useEffect(() => {
    setTeams(premierLeagueTeams);
  }, []);
    
  return (
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
              <div className="text-center">
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
  );
};
export default Teams
