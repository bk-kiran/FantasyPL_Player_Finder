import './App.css';
import PlayerSearchBar from './components/PlayerSearchBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PlayerStats from './components/PlayerStats';
import Teams from './components/Teams';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerSearchBar />} />
        <Route path="/playerstats/:playerName" element={<PlayerStats />} />
        <Route path="/teams" element={<Teams/>}/>
      </Routes>
    </Router>
  );
}
export default App;
