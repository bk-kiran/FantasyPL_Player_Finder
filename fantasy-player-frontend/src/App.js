import './App.css';
import PlayerSearchBar from './components/PlayerSearchBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PlayerStats from './components/PlayerStats';
import Teams from './components/Teams';
import Positions from './components/Positions';
import PlayerFilter from './components/PlayerFilter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerSearchBar />} />
        <Route path="/playerstats/:playerName" element={<PlayerStats />} />
        <Route path="/teams" element={<Teams/>}/>,
        <Route path="/positions" element={<Positions/>}/>
        <Route path="/filter" element={<PlayerFilter />} />
      </Routes>
    </Router>
  );
}
export default App;
