import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductManagement from './pages/products'; 
import {Routes, Route, useNavigate, BrowserRouter as Router, Link} from 'react-router-dom';

function App() {
  
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to DotCart Management System!
        </p>
        
        <Link
          className="App-link"
          to="{/pages/products}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </Link>
        <Link to="/users/42">Go to User 42 Page</Link>
       
      </header>
    </div>
    <Routes>   
       <Route path="/pages/products" element={<ProductManagement />} />
    </Routes>
    </Router>
    
  );
}

export default App;
