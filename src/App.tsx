import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth/auth';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Products from './components/Products/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
    
  );
}

export default App;
