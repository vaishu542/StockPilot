import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Inventory from './components/Inventory';
import Contact from './components/Contact';
import HomePage from './components/HomePage';
import About from './components/About';

function App() {
  return (
    <>
      <Router>
        <NavBar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
