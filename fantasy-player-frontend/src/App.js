import './App.css';
import PlayerSearchBar from './components/PlayerSearchBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PlayerStats from './components/PlayerStats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerSearchBar />} />
        <Route path="/playerstats/:playerName" element={<PlayerStats />} />
      </Routes>
    </Router>
  );
}
export default App;
