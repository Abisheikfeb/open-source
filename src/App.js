import './App.css';
import Navbar from './components/Navbar';
import Home from'./pages/home';
import Stream from './pages/stream';
import Pdf from './pages/pdf';
import Pdfdownlode from './components/Pdfdownloder';
import WikiSearch from './components/WikiSearch';
import WikiArticle from './components/WikiArticle';
import AI from './pages/ai';
import Chatbot from './components/Chatbot';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
   
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/home" element={<Home />} />
      <Route path="/stream" element={<Stream />} />
      <Route path='/pdf' element={<Pdf/>}/>
      <Route path='/pdfdownlode' element={<Pdfdownlode/>}/>
      <Route path='/WikiSearch' element={<WikiSearch/>}/>
      <Route path="/article/:pageid" element={<WikiArticle />} />
      <Route path="/ai" element={<AI />} />
      <Route path="/chatbot" element={< Chatbot/>} />

      
    </Routes>
  </div>
);
}

export default App;