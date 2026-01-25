import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Darvozalar from './pages/Darvozalar';
import Usta from './pages/Usta';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/darvozalar' element={ <Darvozalar/>}/>
          <Route path= '/ustalar' element={<Usta/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;