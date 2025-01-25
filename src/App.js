import './App.css';
import Navbar from './components/Navbar';
import Home from'./pages/home';
import Stream from './pages/stream';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
   
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/home" element={<Home />} />
      <Route path="/stream" element={<Stream />} />
    </Routes>
  </div>
);
}

export default App;