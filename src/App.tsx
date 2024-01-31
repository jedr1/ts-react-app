import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth/auth';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';



function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const toggle2 = () => {
    setIsOpen(false);
  };
  return (
    <Router>
      <Navbar toggle={toggle} isOpen={isOpen} toggle2={toggle2} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update" element={<Products />} />
        <Route path="/sign-in" element={<Auth />} />
      </Routes>
    </Router>
    
  );
}

export default App;
