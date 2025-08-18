import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilter, FaEarthEurope, FaFutbol, FaMapPin, FaCalendar, FaCircleUser, FaCalendarCheck, FaTriangleExclamation, FaBullseye, FaRankingStar, FaUsers, FaSliders, FaClock } from "react-icons/fa6";
import { getFullPositionName } from '../utils/playerUtils';

const PlayerFilter = () => {
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        nations: [],
        teamNames: [],
        positions: [],
        minAge: '',
        maxAge: '',
        minGoals: '',
        maxGoals: '',
        minAssists: '',
        maxAssists: '',
        minGoalsAndAssists: '',
        maxGoalsAndAssists: '',
        minMatchesStarted: '',
        maxMatchesStarted: '',
        minMatchesPlayed: '',
        maxMatchesPlayed: ''
    });

    const API_BASE = 'http://localhost:8080/api/v1/player';

    const [nationOptions, setNationOptions] = useState([]);
    const [teamOptions, setTeamOptions] = useState([]);
    
    const positionOptions = [
        { value: 'GK', label: 'Goalkeeper' },
        { value: 'DF', label: 'Defender' },
        { value: 'MF', label: 'Midfielder' },
        { value: 'MF,FW', label: 'Attacking Midfielder' },
        { value: 'FW,MF', label: 'Winger' },
        { value: 'FW', label: 'Attacker' },
        { value: 'FW,DF', label: 'Wingback' },
        { value: 'DF,FW', label: 'Wingback' },
        { value: 'DF,MF', label: 'Defender, Midfielder' },
        { value: 'MF,DF', label: 'Midfielder, Defender' }
    ];

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                setLoadingOptions(true);
                
                const nationsResponse = await fetch(`${API_BASE}/distinct/nations`);
                if (nationsResponse.ok) {
                    const nationsData = await nationsResponse.json();
                    setNationOptions(nationsData.sort()); 
                } else {
                    console.error('Failed to fetch nations:', nationsResponse.status);
                }
                
                const teamsResponse = await fetch(`${API_BASE}/distinct/teams`);
                if (teamsResponse.ok) {
                    const teamsData = await teamsResponse.json();
                    setTeamOptions(teamsData.sort()); 
                } else {
                    console.error('Failed to fetch teams:', teamsResponse.status);
                }
                
            } catch (err) {
                console.error('Error fetching filter options:', err);
                setNationOptions([]);
                setTeamOptions([]);
            } finally {
                setLoadingOptions(false);
            }
        };

        fetchFilterOptions();
    }, []);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const handleMultiSelectChange = (filterName, value) => {
        setFilters(prev => {
            const currentValues = prev[filterName] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            
            return {
                ...prev,
                [filterName]: newValues
            };
        });
    };

    const buildFilterParams = () => {
        const params = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                if (Array.isArray(value) && value.length > 0) {
                    value.forEach(item => params.append(key, item));
                } else if (!Array.isArray(value)) {
                    params.append(key, value);
                }
            }
        });
        
        return params.toString();
    };

    const searchPlayers = async () => {
        try {
            setLoading(true);
            setError(null);
            setHasSearched(true);
            
            
            const filterData = {};
            
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    if (Array.isArray(value) && value.length > 0) {
                        filterData[key] = value;
                    } else if (!Array.isArray(value)) {
                        filterData[key] = value;
                    }
                }
            });
            
            console.log('Filter data:', filterData); 
            
            const response = await fetch(`${API_BASE}/filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filterData)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', response.status, errorText);
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            const sortedData = data.sort((a, b) => {
                return (b.goals_assists || 0) - (a.goals_assists || 0);
            });
            setFilteredPlayers(sortedData);
            
        } catch (err) {
            console.error('Search error:', err);
            setError(`Error searching for players: ${err.message}. Please try again.`);
            setFilteredPlayers([]);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setFilters({
            nations: [],
            teamNames: [],
            positions: [],
            minAge: '',
            maxAge: '',
            minGoals: '',
            maxGoals: '',
            minAssists: '',
            maxAssists: '',
            minGoalsAndAssists: '',
            maxGoalsAndAssists: '',
            minMatchesStarted: '',
            maxMatchesStarted: '',
            minMatchesPlayed: '',
            maxMatchesPlayed: ''
        });
        setFilteredPlayers([]);
        setHasSearched(false);
        setError(null);
    };

    const handlePlayerSelect = (player) => {
        const urlPlayerName = player.playerName.replace(/\s+/g, '');
        navigate(`/playerstats/${urlPlayerName}`, { 
            state: { player: player } 
        });
    };

    const PlayerCard = ({player, onClick}) => (
        <div
            onClick={() => onClick(player)}
            className="p-4 border border-gray-200 hover:border-blue-300 hover:shadow-sm rounded-lg cursor-pointer transition-all duration-200"
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
    );

    const MultiSelectDropdown = ({ label, options, selectedValues, onChange, icon: Icon }) => (
        <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
                <Icon className="w-4 h-4 mr-2" />
                {label}
            </label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md">
                {options.map((option, index) => {
                    const value = typeof option === 'string' ? option : option.value;
                    const displayLabel = typeof option === 'string' ? option : option.label;
                    return (
                        <label key={`${value}-${index}`} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(value)}
                                onChange={() => onChange(value)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm">{displayLabel}</span>
                        </label>
                    );
                })}
            </div>
            {selectedValues.length > 0 && (
                <div className="text-xs text-gray-600">
                    Selected: {selectedValues.join(', ')}
                </div>
            )}
        </div>
    );

    const RangeInput = ({ label, minValue, maxValue, onMinChange, onMaxChange, icon: Icon, step = "1" }) => (
        <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 mt-6 mb-2">
                <Icon className="w-4 h-4 mr-2" />
                {label}
            </label>
            <div className="flex space-x-2">
                <input
                    type="number"
                    placeholder="Min"
                    value={minValue}
                    onChange={(e) => onMinChange(e.target.value)}
                    step={step}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={maxValue}
                    onChange={(e) => onMaxChange(e.target.value)}
                    step={step}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
    );

  return (
    <main>
        <Navbar/>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Advanced Player Filter
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Find players that match your exact criteria.
                        </p>
                    </div>

                    {/* Filter Panel */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex items-center mb-6">
                            <FaSliders className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-xl font-semibold text-gray-900">Filter Options</h2>
                            {loadingOptions && (
                                <div className="ml-4 flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                    <span className="text-sm text-gray-600">Loading options...</span>
                                </div>
                            )}
                        </div>
                        
                        {loadingOptions ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading filter options...</p>
                            </div>
                        ) : (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                                    
                                    {/* Multi-select dropdowns */}
                                    <MultiSelectDropdown
                                        label="Nations"
                                        options={nationOptions}
                                        selectedValues={filters.nations}
                                        onChange={(value) => handleMultiSelectChange('nations', value)}
                                        icon={FaEarthEurope}
                                    />

                                    <MultiSelectDropdown
                                        label="Teams"
                                        options={teamOptions}
                                        selectedValues={filters.teamNames}
                                        onChange={(value) => handleMultiSelectChange('teamNames', value)}
                                        icon={FaMapPin}
                                    />

                                    <MultiSelectDropdown
                                        label="Positions"
                                        options={positionOptions}
                                        selectedValues={filters.positions}
                                        onChange={(value) => handleMultiSelectChange('positions', value)}
                                        icon={FaCircleUser}
                                    />
                                </div>

                                <div className="gap-6">

                                    {/* Range inputs */}
                                    <RangeInput
                                        label="Age Range"
                                        minValue={filters.minAge}
                                        maxValue={filters.maxAge}
                                        onMinChange={(value) => handleFilterChange('minAge', value)}
                                        onMaxChange={(value) => handleFilterChange('maxAge', value)}
                                        icon={FaClock}
                                        className="mt-4 mb-4"
                                    />

                                    <RangeInput
                                        label="Goals Range"
                                        minValue={filters.minGoals}
                                        maxValue={filters.maxGoals}
                                        onMinChange={(value) => handleFilterChange('minGoals', value)}
                                        onMaxChange={(value) => handleFilterChange('maxGoals', value)}
                                        icon={FaFutbol}
                                    />

                                    <RangeInput
                                        label="Assists Range"
                                        minValue={filters.minAssists}
                                        maxValue={filters.maxAssists}
                                        onMinChange={(value) => handleFilterChange('minAssists', value)}
                                        onMaxChange={(value) => handleFilterChange('maxAssists', value)}
                                        icon={FaBullseye}
                                    />

                                    <RangeInput
                                        label="Goals + Assists Range"
                                        minValue={filters.minGoalsAndAssists}
                                        maxValue={filters.maxGoalsAndAssists}
                                        onMinChange={(value) => handleFilterChange('minGoalsAndAssists', value)}
                                        onMaxChange={(value) => handleFilterChange('maxGoalsAndAssists', value)}
                                        icon={FaRankingStar}
                                    />

                                    <RangeInput
                                        label="Matches Played Range"
                                        minValue={filters.minMatchesPlayed}
                                        maxValue={filters.maxMatchesPlayed}
                                        onMinChange={(value) => handleFilterChange('minMatchesPlayed', value)}
                                        onMaxChange={(value) => handleFilterChange('maxMatchesPlayed', value)}
                                        icon={FaCalendar}
                                    />

                                    <RangeInput
                                        label="Matches Started Range"
                                        minValue={filters.minMatchesStarted}
                                        maxValue={filters.maxMatchesStarted}
                                        onMinChange={(value) => handleFilterChange('minMatchesStarted', value)}
                                        onMaxChange={(value) => handleFilterChange('maxMatchesStarted', value)}
                                        icon={FaCalendarCheck}
                                    />
                                </div>
                            </div>
                            )}

                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-4 mt-8">
                            <button
                                onClick={searchPlayers}
                                disabled={loading || loadingOptions}
                                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <FaFilter className="w-5 h-5 mr-2" />
                                )}
                                {loading ? 'Searching...' : 'Apply Filters'}
                            </button>
                            
                            <button
                                onClick={clearFilters}
                                disabled={loadingOptions}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="max-w-xl mx-auto mb-6">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                <FaTriangleExclamation className="w-5 h-5 text-red-600 mr-3 flex-shrink-0"/>
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    {filteredPlayers.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Filtered Results ({filteredPlayers.length} players found)
                            </h2>
                            <div className="space-y-3">
                                {filteredPlayers.map((player, index) => (
                                    <PlayerCard
                                        key={`${player.playerName}-${player.team_name}-${index}`}
                                        player={player}
                                        onClick={handlePlayerSelect}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {hasSearched && filteredPlayers.length === 0 && !loading && !error && (
                        <div className="text-center py-16">
                            <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-medium text-gray-900 mb-4">
                                No Players Found
                            </h3>
                            <p className="text-gray-600 text-lg">
                                No players match your current filter criteria. Try adjusting your filters and search again.
                            </p>
                        </div>
                    )}

                    {/* Initial State */}
                    {!hasSearched && (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <img src="/images/logo.png" alt="Logo" className='w-25 h-20 mx-auto mb-6' />
                                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                                    Set Filters
                                </h3>
                                <p className="text-gray-600 text-lg">
                                    Use the optional filters above to find players that match your specific criteria, then click "Apply Filters" to see the results.
                                </p>
                                <div className="mt-8 p-4 bg-red-50 rounded-lg">
                                    <p className="text-red-800 text-sm">
                                        <strong>Tip:</strong> You can combine multiple filters to narrow down your search. Leave fields empty to ignore those criteria.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    </main>
  )
}

export default PlayerFilter